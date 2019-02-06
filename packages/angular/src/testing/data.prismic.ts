import {
  Post,
  PostsResponse,
  RefResponse,
  Image,
  Video,
  Text,
  ImageBlockData,
  VideoBlockData,
  DuoBlockData,
  GalleryBlockData
} from 'prismic';

export namespace Prismic {
  export const getPost = () => {
    const post: Post = {
      alternate_languages: [],
      data: {
        title: [{ spans: [], text: 'Post 1', type: 'h1' }],
        description: 'Post 1 description',
        image: {
          dimensions: {
            width: 0,
            height: 0
          },
          url: 'post-1',
          lg: {
            dimensions: {
              width: 0,
              height: 0
            },
            url: 'post-1'
          },
          md: {
            dimensions: {
              width: 0,
              height: 0
            },
            url: 'post-1'
          },
          sm: {
            dimensions: {
              width: 0,
              height: 0
            },
            url: 'post-1'
          },
          xs: {
            dimensions: {
              width: 0,
              height: 0
            },
            url: 'post-1'
          },
          proxy: {
            dimensions: {
              width: 0,
              height: 0
            },
            url: 'post-1'
          }
        },
        body: []
      },
      first_publication_date: null,
      href: '',
      id: '',
      last_publication_date: null,
      slugs: [],
      tags: [],
      type: '',
      uid: 'post-1'
    };

    return post;
  };

  export const getPostsResponse = () => {
    const postsResponse: PostsResponse = {
      license: '',
      next_page: null,
      page: 1,
      prev_page: null,
      results: [
        {
          alternate_languages: [],
          data: {
            title: [{ spans: [], text: 'Post 1', type: 'h1' }],
            description: 'Post 1 description',
            image: {
              dimensions: {
                width: 0,
                height: 0
              },
              url: 'post-1',
              lg: {
                dimensions: {
                  width: 0,
                  height: 0
                },
                url: 'post-1'
              },
              md: {
                dimensions: {
                  width: 0,
                  height: 0
                },
                url: 'post-1'
              },
              sm: {
                dimensions: {
                  width: 0,
                  height: 0
                },
                url: 'post-1'
              },
              xs: {
                dimensions: {
                  width: 0,
                  height: 0
                },
                url: 'post-1'
              },
              proxy: {
                dimensions: {
                  width: 0,
                  height: 0
                },
                url: 'post-1'
              }
            },
            body: []
          },
          first_publication_date: new Date('1 Jan'),
          href: '',
          id: '',
          last_publication_date: null,
          slugs: [],
          tags: [],
          type: '',
          uid: 'post-1'
        },
        {
          alternate_languages: [],
          data: {
            title: [{ spans: [], text: 'Post 2', type: 'h1' }],
            description: 'Post 2 description',
            image: {
              dimensions: {
                width: 0,
                height: 0
              },
              url: 'post-2',
              lg: {
                dimensions: {
                  width: 0,
                  height: 0
                },
                url: 'post-2'
              },
              md: {
                dimensions: {
                  width: 0,
                  height: 0
                },
                url: 'post-2'
              },
              sm: {
                dimensions: {
                  width: 0,
                  height: 0
                },
                url: 'post-2'
              },
              xs: {
                dimensions: {
                  width: 0,
                  height: 0
                },
                url: 'post-2'
              },
              proxy: {
                dimensions: {
                  width: 0,
                  height: 0
                },
                url: 'post-2'
              }
            },
            body: []
          },
          first_publication_date: null,
          href: '',
          id: '',
          last_publication_date: null,
          slugs: [],
          tags: [],
          type: '',
          uid: 'post-2'
        },
        {
          alternate_languages: [],
          data: {
            title: [{ spans: [], text: 'Post 3', type: 'h1' }],
            description: 'Post 3 description',
            image: {
              dimensions: {
                width: 0,
                height: 0
              },
              url: 'post-3',
              lg: {
                dimensions: {
                  width: 0,
                  height: 0
                },
                url: 'post-3'
              },
              md: {
                dimensions: {
                  width: 0,
                  height: 0
                },
                url: 'post-3'
              },
              sm: {
                dimensions: {
                  width: 0,
                  height: 0
                },
                url: 'post-3'
              },
              xs: {
                dimensions: {
                  width: 0,
                  height: 0
                },
                url: 'post-3'
              },
              proxy: {
                dimensions: {
                  width: 0,
                  height: 0
                },
                url: 'post-3'
              }
            },
            body: []
          },
          first_publication_date: null,
          href: '',
          id: '',
          last_publication_date: null,
          slugs: [],
          tags: [],
          type: '',
          uid: 'post-3'
        }
      ],
      results_per_page: 0,
      results_size: 0,
      total_pages: 0,
      total_results_size: 0,
      version: ''
    };

    return postsResponse;
  };

  export const getPosts = <
    T extends
      | void
      | 'post-1'
      | 'post-2'
      | 'post-3'
      | 'post-4'
      | 'post-5'
      | 'post-6'
  >(
    uid?: T
  ): T extends string ? Post : Post[] => {
    const posts: Post[] = [
      {
        alternate_languages: [],
        data: {
          title: [{ spans: [], text: 'Post 1', type: 'h1' }],
          description: 'Post 1 description',
          image: {
            dimensions: {
              width: 0,
              height: 0
            },
            url: 'post-1',
            lg: {
              dimensions: {
                width: 0,
                height: 0
              },
              url: 'post-1'
            },
            md: {
              dimensions: {
                width: 0,
                height: 0
              },
              url: 'post-1'
            },
            sm: {
              dimensions: {
                width: 0,
                height: 0
              },
              url: 'post-1'
            },
            xs: {
              dimensions: {
                width: 0,
                height: 0
              },
              url: 'post-1'
            },
            proxy: {
              dimensions: {
                width: 0,
                height: 0
              },
              url: 'post-1'
            }
          },
          body: []
        },
        first_publication_date: new Date('1 Jan'),
        href: '',
        id: '',
        last_publication_date: null,
        slugs: [],
        tags: [],
        type: '',
        uid: 'post-1'
      },
      {
        alternate_languages: [],
        data: {
          title: [{ spans: [], text: 'Post 2', type: 'h1' }],
          description: 'Post 2 description',
          image: null as any,
          body: [
            {
              slice_type: 'text',
              primary: {
                text: [
                  {
                    spans: null,
                    text: 'This is a sentence.',
                    type: 'paragraph'
                  }
                ]
              }
            }
          ]
        },
        first_publication_date: null,
        href: '',
        id: '',
        last_publication_date: null,
        slugs: [],
        tags: [],
        type: '',
        uid: 'post-2'
      },
      {
        alternate_languages: [],
        data: {
          title: [{ spans: [], text: 'Post 3', type: 'h1' }],
          description: 'Post 3 description',
          image: null as any,
          body: [
            {
              slice_type: 'image',
              primary: {
                image: {
                  dimensions: null,
                  url: 'image',
                  lg: null,
                  md: null,
                  sm: null,
                  xs: null,
                  proxy: null
                }
              }
            }
          ]
        },
        first_publication_date: null,
        href: '',
        id: '',
        last_publication_date: null,
        slugs: [],
        tags: [],
        type: '',
        uid: 'post-3'
      },
      {
        alternate_languages: [],
        data: {
          title: [{ spans: [], text: 'Post 4', type: 'h1' }],
          description: 'Post 4 description',
          image: null as any,
          body: [
            {
              slice_type: 'duo',
              items: [
                {
                  image: {
                    dimensions: null,
                    url: 'image-1',
                    lg: null,
                    md: null,
                    sm: null,
                    xs: null,
                    proxy: null
                  }
                },
                {
                  image: {
                    dimensions: null,
                    url: 'image-2',
                    lg: null,
                    md: null,
                    sm: null,
                    xs: null,
                    proxy: null
                  }
                }
              ]
            }
          ]
        },
        first_publication_date: null,
        href: '',
        id: '',
        last_publication_date: null,
        slugs: [],
        tags: [],
        type: '',
        uid: 'post-4'
      },
      {
        alternate_languages: [],
        data: {
          title: [{ spans: [], text: 'Post 5', type: 'h1' }],
          description: 'Post 5 description',
          image: null as any,
          body: [
            {
              slice_type: 'gallery',
              items: [
                {
                  image: {
                    dimensions: null,
                    url: 'image-1',
                    lg: null,
                    md: null,
                    sm: null,
                    xs: null,
                    proxy: null
                  }
                },
                {
                  image: {
                    dimensions: null,
                    url: 'image-2',
                    lg: null,
                    md: null,
                    sm: null,
                    xs: null,
                    proxy: null
                  }
                },
                {
                  image: {
                    dimensions: null,
                    url: 'image-3',
                    lg: null,
                    md: null,
                    sm: null,
                    xs: null,
                    proxy: null
                  }
                }
              ]
            }
          ]
        },
        first_publication_date: null,
        href: '',
        id: '',
        last_publication_date: null,
        slugs: [],
        tags: [],
        type: '',
        uid: 'post-5'
      },
      {
        alternate_languages: [],
        data: {
          title: [{ spans: [], text: 'Post 6', type: 'h1' }],
          description: 'Post 6 description',
          image: null as any,
          body: [
            {
              slice_type: 'video',
              primary: {
                video: {
                  link_type: 'external',
                  url: 'youtube.com'
                }
              }
            }
          ]
        },
        first_publication_date: null,
        href: '',
        id: '',
        last_publication_date: null,
        slugs: [],
        tags: [],
        type: '',
        uid: 'post-6'
      }
    ];

    if (!uid) return posts as any;

    const foundPost = posts.find(post => post.uid === uid);
    return foundPost as any;
  };

  export const getRefResponse = () => {
    const refResponse: RefResponse = {
      bookmarks: {},
      experiments: {},
      forms: {},
      license: '',
      oauth_initiate: '',
      oauth_token: '',
      refs: [
        {
          id: '1',
          isMasterRef: true,
          label: '',
          ref: 'abc'
        },
        {
          id: '2',
          isMasterRef: false,
          label: '',
          ref: 'def'
        },
        {
          id: '3',
          isMasterRef: false,
          label: '',
          ref: 'ghi'
        }
      ],
      tags: [],
      types: {},
      version: ''
    };

    return refResponse;
  };

  export const getText = () => {
    const text: Text[] = [
      {
        spans: [],
        text: 'This is a sentence.',
        type: 'paragraph'
      },
      {
        spans: [{ start: 0, end: 24, type: 'strong' }],
        text: 'This is a bold sentence.',
        type: 'paragraph'
      }
    ];

    return text;
  };

  export const getImage = () => {
    const image: Image = {
      dimensions: {
        width: 1,
        height: 1
      },
      url: 'image',
      alt: 'image',
      lg: {
        dimensions: {
          width: 1,
          height: 1
        },
        url: 'image-lg'
      },
      md: {
        dimensions: {
          width: 1,
          height: 1
        },
        url: 'image-md'
      },
      sm: {
        dimensions: {
          width: 1,
          height: 1
        },
        url: 'image-sm'
      },
      xs: {
        dimensions: {
          width: 1,
          height: 1
        },
        url: 'image-xs'
      },
      proxy: {
        dimensions: {
          width: 1,
          height: 1
        },
        url: 'image-proxy'
      }
    };

    return image;
  };

  export const getImageBlockData = () => {
    const data: ImageBlockData = {
      image: getImage()
    };

    return data;
  };

  export const getGalleryBlockData = () => {
    const data: GalleryBlockData = [
      {
        image: getImage()
      },
      {
        image: getImage()
      },
      {
        image: getImage()
      },
      {
        image: getImage()
      },
      {
        image: getImage()
      }
    ];

    return data;
  };

  export const getDuoBlockData = () => {
    const data: DuoBlockData = [
      {
        image: getImage()
      },
      {
        image: getImage()
      }
    ];

    return data;
  };

  export const getVideo = () => {
    const video: Video = {
      link_type: 'external',
      url: 'youtube.com'
    };

    return video;
  };

  export const getVideoBlockData = () => {
    const data: VideoBlockData = {
      video: getVideo()
    };

    return data;
  };
}
