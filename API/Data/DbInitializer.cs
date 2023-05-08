using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
  public static class DbInitializer
  {
    public static async Task Initialize(StoreContext context, UserManager<User> userManager)
    {
      if (!userManager.Users.Any())
      {
        var user = new User
        {
          UserName = "raudzius",
          Email = "raudziusmykolas@gmail.com"
        };

        await userManager.CreateAsync(user, "Pa$$w0rd");
        await userManager.AddToRoleAsync(user, "Member");

        var admin = new User
        {
          UserName = "admin",
          Email = "admin@test.com"
        };

        await userManager.CreateAsync(admin, "Pa$$w0rd");
        await userManager.AddToRolesAsync(admin, new[] { "Member", "Admin" });
      }
      if (context.Products!.Any()) return;
      var products = new List<Product>
      {
        new Product
                {
                    Name = "Button",
                    Description =
                        "White or button mushrooms are the most commonly used mushrooms worldwide and have a mild, earthy flavor, sometimes described as slightly nutty.",
                    Price = 300,
                    PictureUrl = "/images/products/button-mushrooms.jpg",
                    Type = "Button",
                    Category = "Edible",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Cremini",
                    Description =
                        "Cremini mushrooms are actually the same type of mushroom as white mushrooms and portobellos, the only difference being their stage of maturity. Cremini mushrooms have a mild, earthy flavor and a meaty texture.",
                    Price = 700,
                    PictureUrl = "/images/products/cremini-mushrooms.jpg",
                    Type = "Button",
                    Category = "Edible",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Portobello",
                    Description =
                        "Portobello mushrooms are a large, meaty variety of mushrooms with a rich, savory flavor and dense, toothsome texture. They're typically served grilled, broiled, stuffed, and as a meat substitute in sandwiches and burgers.",
                    Price = 900,
                    PictureUrl = "/images/products/portobello-mushrooms.jpg",
                    Type = "Button",
                    Category = "Edible",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Tree Oyster",
                    Description =
                        "The tree oyster mushroom, is an edible mushroom prized for its subtly savoury flavour and meaty texture.",
                    Price = 1500,
                    PictureUrl = "/images/products/tree-oyster-mushrooms.jpg",
                    Type = "Oyster",
                    Category = "Edible",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Golden Oyster",
                    Description =
                        "One of our most beautiful oyster species, this warm weather strain is VERY FRAGILE when mature. They resemble a bouquet of beautiful yellow flowers, smell like fresh watermelon, and taste like roasted cashews when you saute them in oil.",
                    Price = 2000,
                    PictureUrl = "/images/products/yellow-oyster-mushrooms.jpg",
                    Type = "Oyster",
                    Category = "Edible",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Pink Oyster",
                    Description =
                        "These deliciously delicate oyster mushrooms taste like bacon or ham, and their flavor intensifies when cooked. The aroma is pungent, which is very characteristic of the oyster mushroom. Their meat-like flavor and succulent texture makes Pink Oyster mushrooms a wonderful meat substitute in many dishes.",
                    Price = 2000,
                    PictureUrl = "/images/products/pink-oyster-mushrooms.jpg",
                    Type = "Oyster",
                    Category = "Edible",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "King Oyster",
                    Description =
                        "The King mushroom flavor is earthy, aromatic, and very savory. This variety of mushroom is known for its intense umami flavor. Some people say they have a subtle flavor of anise (black licorice) on the finish.",
                    Price = 2000,
                    PictureUrl = "/images/products/king-oyster-mushrooms.jpg",
                    Type = "Oyster",
                    Category = "Edible",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Shiitake",
                    Description =
                        "Native to East Asia, the shiitake mushroom is among the most commonly cultivated fungi in the world. Important in a number of Asian and vegetarian dishes, shiitake mushrooms are high in dietary fibre, B vitamins (especially pantothenic acid), copper, selenium, manganese, and iron.",
                    Price = 2000,
                    PictureUrl = "/images/products/shiitake-mushrooms.jpg",
                    Type = "Shiitake",
                    Category = "Edible",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Lion's mane",
                    Description =
                        "Lion's mane is a mushroom that grows on trunks of dead hardwood trees such as oak. It has a long history of use in East Asian medicine. Lion's mane mushroom might improve nerve development and function. It might also protect nerves from becoming damaged.",
                    Price = 2000,
                    PictureUrl = "/images/products/lions-mane-mushrooms.jpg",
                    Type = "Lion's mane",
                    Category = "Edible",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Reishi",
                    Description =
                        "Reishi mushrooms have more than 400 different nutrients. This includes beta-glucans and triterpenoids, compounds that can lower blood sugar and blood pressure levels, reducing your diabetes and heart disease risk.",
                    Price = 4000,
                    PictureUrl = "/images/products/reishi-mushrooms.jpg",
                    Type = "Reishi",
                    Category = "Medicinal",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Cordyceps",
                    Description =
                        "Cordyceps might improve immunity by stimulating cells and specific chemicals in the immune system. It might also help fight cancer cells and shrink tumor size, particularly with lung or skin cancers.",
                    Price = 8000,
                    PictureUrl = "/images/products/cordyceps-mushrooms.jpg",
                    Type = "Cordyceps",
                    Category = "Medicinal",
                    QuantityInStock = 100
                },
      };

      foreach (var product in products)
      {
        context.Products!.Add(product);
      }

      context.SaveChanges();
    }
  }
}