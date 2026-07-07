using Faro.Application.Businesses.Dtos;
using Faro.Application.Businesses.Interfaces;
using Faro.Domain.Entities;
using Faro.Domain.Enums;
using Faro.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Faro.Infrastructure.Businesses.Services;

public class BusinessService : IBusinessService
{
    private readonly AppDbContext _dbContext;

    public BusinessService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<BusinessDto> CreateBusinessAsync(CreateBusinessRequest request)
    {
        var ownerExists = await _dbContext.UserAccounts
            .AnyAsync(u => u.Id == request.OwnerUserAccountId && u.IsActive);

        if (!ownerExists)
        {
            throw new InvalidOperationException("Owner user account does not exist or is inactive.");
        }

        var nowUtc = DateTime.UtcNow;

        var business = new Business
        {
            Id = Guid.NewGuid(),
            Name = request.Name.Trim(),
            Description = request.Description,
            BusinessType = request.BusinessType,
            Status = BusinessStatus.Pending,
            VenueRelationship = request.VenueRelationship,
            OwnerUserAccountId = request.OwnerUserAccountId,
            CreatedAtUtc = nowUtc,
            UpdatedAtUtc = nowUtc
        };

        _dbContext.Businesses.Add(business);

        await _dbContext.SaveChangesAsync();

        return MapToDto(business);
    }

    public async Task<BusinessDto?> GetBusinessByIdAsync(Guid id)
    {
        return await _dbContext.Businesses
            .AsNoTracking()
            .Where(b => b.Id == id)
            .Select(b => new BusinessDto
            {
                Id = b.Id,
                Name = b.Name,
                Description = b.Description,
                BusinessType = b.BusinessType,
                Status = b.Status,
                VenueRelationship = b.VenueRelationship,
                OwnerUserAccountId = b.OwnerUserAccountId,
                CreatedAtUtc = b.CreatedAtUtc,
                UpdatedAtUtc = b.UpdatedAtUtc
            })
            .FirstOrDefaultAsync();
    }

    public async Task<List<BusinessDto>> GetBusinessesForUserAsync(Guid userAccountId)
    {
        return await _dbContext.Businesses
            .AsNoTracking()
            .Where(b => b.OwnerUserAccountId == userAccountId)
            .OrderBy(b => b.Name)
            .Select(b => new BusinessDto
            {
                Id = b.Id,
                Name = b.Name,
                Description = b.Description,
                BusinessType = b.BusinessType,
                Status = b.Status,
                VenueRelationship = b.VenueRelationship,
                OwnerUserAccountId = b.OwnerUserAccountId,
                CreatedAtUtc = b.CreatedAtUtc,
                UpdatedAtUtc = b.UpdatedAtUtc
            })
            .ToListAsync();
    }

    private static BusinessDto MapToDto(Business business)
    {
        return new BusinessDto
        {
            Id = business.Id,
            Name = business.Name,
            Description = business.Description,
            BusinessType = business.BusinessType,
            Status = business.Status,
            VenueRelationship = business.VenueRelationship,
            OwnerUserAccountId = business.OwnerUserAccountId,
            CreatedAtUtc = business.CreatedAtUtc,
            UpdatedAtUtc = business.UpdatedAtUtc
        };
    }
}