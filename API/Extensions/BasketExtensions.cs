using API.DTOs;
using API.Entities;

namespace API.Extensions
{
  public static class BasketExtensions
  {
    public static BasketDto MapBasketToDto(this Basket basket)
    {
      return new BasketDto
      {
        Id = basket.Id,
        BuyerId = basket.BuyerId,
        Items = basket.Items.Select(item => new BasketItemDto
        {
          ProductId = item.ProductId,
          Name = item.Product?.Name,
          Price = item.Product?.Price ?? 0,
          PictureUrl = item.Product?.PictureUrl,
          Type = item.Product?.Type,
          Category = item.Product?.Category,
          Quantity = item.Quantity
        }).ToList()
      };
    }
  }
}