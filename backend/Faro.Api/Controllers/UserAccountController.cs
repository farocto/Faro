using Faro.Application.Businesses.Dtos;
using Faro.Application.Businesses.Interfaces;
using Faro.Application.UserAccounts.Dtos;
using Faro.Application.UserAccounts.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Faro.Api.Controllers;

[ApiController]
[Route("api/user-accounts")]
public class UserAccountsController : ControllerBase
{
    private readonly IUserAccountService _userAccountService;
    private readonly IBusinessService _businessService;

    public UserAccountsController(
        IUserAccountService userAccountService,
        IBusinessService businessService)
    {
        _userAccountService = userAccountService;
        _businessService = businessService;
    }

    [HttpPost]
    public async Task<ActionResult<UserAccountDto>> CreateUserAccount(CreateUserAccountRequest request)
    {
        try
        {
            var createdUserAccount = await _userAccountService.CreateUserAccountAsync(request);

            return CreatedAtAction(
                nameof(GetUserAccountById),
                new { id = createdUserAccount.Id },
                createdUserAccount);
        }
        catch (InvalidOperationException exception)
        {
            return BadRequest(new
            {
                error = exception.Message
            });
        }
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<UserAccountDto>> GetUserAccountById(Guid id)
    {
        var userAccount = await _userAccountService.GetUserAccountByIdAsync(id);

        if (userAccount is null)
        {
            return NotFound();
        }

        return Ok(userAccount);
    }

    [HttpGet("{userAccountId:guid}/businesses")]
    public async Task<ActionResult<List<BusinessDto>>> GetBusinessesForUser(Guid userAccountId)
    {
        var businesses = await _businessService.GetBusinessesForUserAsync(userAccountId);

        return Ok(businesses);
    }
}