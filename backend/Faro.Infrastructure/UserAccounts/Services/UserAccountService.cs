using Faro.Application.UserAccounts.Dtos;
using Faro.Application.UserAccounts.Interfaces;
using Faro.Domain.Entities;
using Faro.Domain.Enums;
using Faro.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Faro.Infrastructure.UserAccounts.Services;

public class UserAccountService : IUserAccountService
{
    private readonly AppDbContext _dbContext;

    public UserAccountService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<UserAccountDto> CreateUserAccountAsync(CreateUserAccountRequest request)
    {
        var email = request.Email.Trim().ToLowerInvariant();

        var emailAlreadyExists = await _dbContext.UserAccounts
            .AnyAsync(u => u.Email == email);

        if (emailAlreadyExists)
        {
            throw new InvalidOperationException("A user account with this email already exists.");
        }

        var nowUtc = DateTime.UtcNow;

        var userAccount = new UserAccount
        {
            Id = Guid.NewGuid(),
            Email = email,
            DisplayName = request.DisplayName.Trim(),
            Role = UserRole.User,
            IsActive = true,
            CreatedAtUtc = nowUtc,
            UpdatedAtUtc = nowUtc
        };

        _dbContext.UserAccounts.Add(userAccount);

        await _dbContext.SaveChangesAsync();

        return MapToDto(userAccount);
    }

    public async Task<UserAccountDto?> GetUserAccountByIdAsync(Guid id)
    {
        return await _dbContext.UserAccounts
            .AsNoTracking()
            .Where(u => u.Id == id)
            .Select(u => new UserAccountDto
            {
                Id = u.Id,
                Email = u.Email,
                DisplayName = u.DisplayName,
                Role = u.Role,
                IsActive = u.IsActive,
                CreatedAtUtc = u.CreatedAtUtc,
                UpdatedAtUtc = u.UpdatedAtUtc
            })
            .FirstOrDefaultAsync();
    }

    private static UserAccountDto MapToDto(UserAccount userAccount)
    {
        return new UserAccountDto
        {
            Id = userAccount.Id,
            Email = userAccount.Email,
            DisplayName = userAccount.DisplayName,
            Role = userAccount.Role,
            IsActive = userAccount.IsActive,
            CreatedAtUtc = userAccount.CreatedAtUtc,
            UpdatedAtUtc = userAccount.UpdatedAtUtc
        };
    }
}