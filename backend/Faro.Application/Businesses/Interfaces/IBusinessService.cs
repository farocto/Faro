using Faro.Application.Businesses.Dtos;

namespace Faro.Application.Businesses.Interfaces;

public interface IBusinessService
{
    Task<BusinessDto> CreateBusinessAsync(CreateBusinessRequest request);

    Task<BusinessDto?> GetBusinessByIdAsync(Guid id);

    Task<List<BusinessDto>> GetBusinessesForUserAsync(Guid userAccountId);
}