using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ProductsController : BaseApiController
  {
    private readonly StoreContext _context;
    public ProductsController(StoreContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductParams productParams)
    {
      var query = _context.Products!.Sort(productParams.OrderBy).Search(productParams.SearchTerm).Filter(productParams.Types, productParams.Categories).AsQueryable();
      var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);

      Response.AddPaginationHeader(products.MetaData!);

      return products;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product?>> GetProduct(int id)
    {
      return await _context.Products!.FindAsync(id);
    }

    [HttpGet("filters")]
    public async Task<IActionResult> GetFilters()
    {
      var types = await _context.Products!.Select(product => product.Type).Distinct().ToListAsync();
      var categories = await _context.Products!.Select(product => product.Category).Distinct().ToListAsync();

      return Ok(new { types, categories });
    }
  }
}