namespace Faro.Domain.Entities;

using Faro.Domain.Enums;

public class UserAccount : BaseEntity
{
    public string Email { get; set; } = string.Empty;

    public string DisplayName { get; set; } = string.Empty;

    public UserRole Role { get; set; } = UserRole.User;

    public bool IsActive { get; set; } = true;

    public ICollection<BusinessAccount> BusinessAccounts { get; set; } = new List<BusinessAccount>();
}