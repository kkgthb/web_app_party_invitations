import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeEach, describe, expect, it } from "vitest";
import index from "./index.astro";

describe("Home page", () => {
  let astro_container: AstroContainer;
  beforeEach(async () => {
    astro_container = await AstroContainer.create();
  })
  it("Home page contains expected text", async () => {
    const result: string = await astro_container.renderToString(index);
    expect(result, 'Contains hello world').toContain('Hello world!');
  });
});
