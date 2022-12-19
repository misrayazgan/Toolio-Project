process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const productsService = require("../services/products")

const nTotalProducts = 933;
const keywordsAndLengths = [ { keyword: "Awesome", length: 52 },
                             { keyword: "table", length: 48 },
                             { keyword: "cHAiR", length: 54 },
                             { keyword: "LINEN", length: 68 } ];

describe("Products service tests", () => {
  test("should return json object containing id and title of all products", async() => {
    jest.setTimeout(20000);
    const allProducts = await productsService.getAllProducts();
    
    expect(allProducts).toEqual(expect.any(Object));
    expect(allProducts.products).toEqual(expect.any(Array));
    expect(allProducts.products.length).toEqual(nTotalProducts);
    expect(allProducts.products.forEach(p => Object.keys(p) === [ "id", "title" ] ));
  });

  keywordsAndLengths.forEach(pair => {
    test("should return id and title of the products matching the given keyword", async() => {
      const products = await productsService.getProductsByTitle(pair.keyword);

      expect(products).toEqual(expect.any(Array));
      expect(products.forEach(p => p.title.toLowerCase().includes(pair.keyword.toLowerCase())));
      expect(products.length).toEqual(pair.length);
      expect(products.forEach(p => Object.keys(p) === [ "id", "title" ] ));
    });
  });  
});

describe("Products tests", () => {
  test("should get no products but a message, when query part of the url is empty", async() => {
    const res = await request(app).get("/products");

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.msg).toEqual(expect.any(String));
  });

  test("should get no products but a message, when no title is provided in the url", async() => {
    const res = await request(app).get("/products?title=");

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.msg).toEqual(expect.any(String));
  });

  keywordsAndLengths.forEach(pair => {
    test("should get id and title fields of the matching products, when a title is provided in the query", async() => {
      const res = await request(app).get("/products?title=" + pair.keyword);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body.products).toEqual(expect.any(Array));
      expect(res.body.products.forEach(p => p.title.toLowerCase().includes(pair.keyword.toLowerCase())));
      expect(res.body.products.length).toEqual(pair.length);
      expect(res.body.products.forEach(p => Object.keys(p) === [ "id", "title" ] ));
    });
  });
});
