import { Request, Response } from "express-serve-static-core";
import { PrismaClient } from "../../generated/prisma/index";
const prisma = new PrismaClient();
/**
 * @param request: client Request
 * @param response: client Response
 * @returns Promise
 */
export class BlogControler {
  public async getBlogs(request: Request, response: Response) {
    try {
      const term = request.query.term;

      if (!term) {
        // If no term specified, return all blogs
        const allBlogs = await prisma.blog.findMany();
        response.status(200).send(allBlogs);
      }

      // Filter blogs by exact term match
      const filteredBlogs = await prisma.blog.findMany({
        orderBy: [
          {
            title: "asc",
          },
        ],
        where: {
          OR: [
            { title: { contains: String(term), mode: "insensitive" } },
            { description: { contains: String(term), mode: "insensitive" } },
          ],
        },
      });

      response.status(200).send(filteredBlogs);
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Server Error", error });
    }
  }
  public async getBlogByID(request: Request, response: Response) {
    const id = request.params.id;

    if (!id) {
      response.status(400).send({ message: "Invalid ID" });
      return;
    }

    try {
      const blog = await prisma.blog.findUnique({ where: { id } });

      if (!blog) {
        response.status(404).send({ message: "Blog not found" });
      }

      response.status(200).send(blog);
      return;
    } catch (error) {
      response.status(500).send({ message: "Server Error" });
    }
  }
  public async postBlog(request: Request, response: Response) {
    const { description, title } = request.body || {};
    if (!title || !description) {
      response
        .status(400)
        .send({
          message: "Title and description are required and must be valid JSON.",
        });
      return;
    }
    try {
      const blog = await prisma.blog.create({
        data: {
          description,
          title,
        },
      });
      response.status(201).send({ message: "Blog created successfully", blog });
    } catch (error) {
      response.status(500).send({ message: "Internal server error", error });
    }
  }
  public async updateBlog(request: Request, response: Response) {
    const blogId = request.params.id;
    const updateData = request.body || {};
    if (!blogId) {
      response.status(400).send({ message: "Valid blogId is required" });
      return;
    }
    if (Object.keys(updateData).length === 0) {
      response
        .status(400)
        .send({
          message: "Request body must be valid JSON with fields to update.",
        });
      return;
    }
    try {
      const updatedBlog = await prisma.blog.update({
        where: { id: blogId },
        data: {
          ...updateData,
          updatedAt: new Date(),
        },
      });
      response
        .status(200)
        .send({ message: "Blog updated successfully", blog: updatedBlog });
    } catch (error) {
      response.status(500).send({ message: "Internal server error", error });
    }
  }
  public async deleteBlog(request: Request, response: Response) {
    const id = request.params.id;

    if (!id) {
      response.status(400).send({ message: "Valid blog id is required" });
      return;
    }

    try {
      await prisma.blog.delete({
        where: { id },
      });

      response.status(200).send({ message: "Blog deleted successfully" });
    } catch (error) {
      response.status(500).send({ message: "Internal server error", error });
    }
  }
}
