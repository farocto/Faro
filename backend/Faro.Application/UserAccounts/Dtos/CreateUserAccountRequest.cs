namespace Faro.Application.UserAccounts.Dtos;

public class CreateUserAccountRequest
{
    public string Email { get; set; } = string.Empty;

    public string DisplayName { get; set; } = string.Empty;
}