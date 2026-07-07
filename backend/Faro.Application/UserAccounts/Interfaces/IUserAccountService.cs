using Faro.Application.UserAccounts.Dtos;

namespace Faro.Application.UserAccounts.Interfaces;

public interface IUserAccountService
{
    Task<UserAccountDto> CreateUserAccountAsync(CreateUserAccountRequest request);

    Task<UserAccountDto?> GetUserAccountByIdAsync(Guid id);
}