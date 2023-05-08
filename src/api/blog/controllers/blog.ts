/**
 * blog controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::blog.blog",
  ({ strapi }) => ({
    // Method 1: Creating an entirely custom action
    async logView(ctx) {
      const { slug } = ctx.params;

      try {
        const article = await strapi.db.query("api::blog.blog").findOne(slug);

        await strapi.db.query("api::blog.blog").update({
          where: { id: article.id },
          data: { views: parseInt(article.views) + 1 },
        });
        return ctx.send({
          success: true,
        });
      } catch (error) {
        console.error(error);
        return ctx.send({
          success: false,
        });
      }
    },

    async findOne(ctx) {
      const { id } = ctx.params;
      const entity = await strapi.db.query("api::blog.blog").findOne({
        where: { slug: id },
        populate: ["image"],
      });

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    },
  })
);
