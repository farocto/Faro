using Faro.Application.Businesses.Dtos;
using Faro.Application.Businesses.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Faro.Api.Controllers;

[ApiController]
[Route("api/businesses")]
public class BusinessesController : ControllerBase
{
    private readonly IBusinessService _businessService;

    public BusinessesController(IBusinessService businessService)
    {
        _businessService = businessService;
    }

    [HttpPost]
    public async Task<ActionResult<BusinessDto>> CreateBusiness(CreateBusinessRequest request)
    {
        try
        {
            var createdBusiness = await _businessService.CreateBusinessAsync(request);

            return CreatedAtAction(
                nameof(GetBusinessById),
                new { id = createdBusiness.Id },
                createdBusiness);
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
    public async Task<ActionResult<BusinessDto>> GetBusinessById(Guid id)
    {
        var business = await _businessService.GetBusinessByIdAsync(id);

        if (business is null)
        {
            return NotFound();
        }

        return Ok(business);
    }
}