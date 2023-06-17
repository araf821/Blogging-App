import prismaClient from "../lib/prismadb";

interface IParams {
  slug: string;
}

const getPostBySlug = async (params: IParams) => {
  try {
    const { slug } = params;

    if (!slug) {
      return null;
    }

    const post = await prismaClient.post.findUnique({
      where: {
        slug: slug,
      },
      include: {
        author: true,
      },
    });

    if (post) {
      const safePost = {
        ...post,
        author: {
          id: post.author.id,
          name: post.author.name,
          image: post.author.image,
        },
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
      };

      return safePost;
    } else {
      return null;
    }
  } catch (error: any) {
    return null;
  }
};
export default getPostBySlug;
