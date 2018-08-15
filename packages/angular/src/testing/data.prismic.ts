import { Prismic as PrismicType } from 'shared';

export namespace Prismic {
  export const postsResponse: PrismicType.PostsResponse = {
    license: null,
    next_page: null,
    page: 1,
    prev_page: null,
    results: [
      {
        alternate_languages: null,
        data: {
          title: [{ spans: null, text: 'Post 1', type: 'h1' }],
          description: 'Post 1 description',
          image: {
            dimensions: null,
            url: 'post-1',
            lg: {
              dimensions: null,
              url: 'post-1'
            },
            md: {
              dimensions: null,
              url: 'post-1'
            },
            sm: {
              dimensions: null,
              url: 'post-1'
            },
            xs: {
              dimensions: null,
              url: 'post-1'
            },
            proxy: {
              dimensions: null,
              url: 'post-1'
            }
          },
          body: null
        },
        first_publication_date: null,
        href: null,
        id: null,
        last_publication_date: null,
        slugs: null,
        tags: null,
        type: null,
        uid: 'post-1'
      },
      {
        alternate_languages: null,
        data: {
          title: [{ spans: null, text: 'Post 2', type: 'h1' }],
          description: 'Post 2 description',
          image: {
            dimensions: null,
            url: 'post-2',
            lg: {
              dimensions: null,
              url: 'post-2'
            },
            md: {
              dimensions: null,
              url: 'post-2'
            },
            sm: {
              dimensions: null,
              url: 'post-2'
            },
            xs: {
              dimensions: null,
              url: 'post-2'
            },
            proxy: {
              dimensions: null,
              url: 'post-2'
            }
          },
          body: null
        },
        first_publication_date: null,
        href: null,
        id: null,
        last_publication_date: null,
        slugs: null,
        tags: null,
        type: null,
        uid: 'post-2'
      },
      {
        alternate_languages: null,
        data: {
          title: [{ spans: null, text: 'Post 3', type: 'h1' }],
          description: 'Post 3 description',
          image: {
            dimensions: null,
            url: 'post-3',
            lg: {
              dimensions: null,
              url: 'post-3'
            },
            md: {
              dimensions: null,
              url: 'post-3'
            },
            sm: {
              dimensions: null,
              url: 'post-3'
            },
            xs: {
              dimensions: null,
              url: 'post-3'
            },
            proxy: {
              dimensions: null,
              url: 'post-3'
            }
          },
          body: null
        },
        first_publication_date: null,
        href: null,
        id: null,
        last_publication_date: null,
        slugs: null,
        tags: null,
        type: null,
        uid: 'post-3'
      }
    ],
    results_per_page: null,
    results_size: null,
    total_pages: null,
    total_results_size: null,
    version: null
  };

  export const posts: PrismicType.Post[] = [
    {
      alternate_languages: null,
      data: {
        title: [{ spans: null, text: 'Post 1', type: 'h1' }],
        description: 'Post 1 description',
        image: {
          dimensions: null,
          url: 'post-1',
          lg: {
            dimensions: null,
            url: 'post-1'
          },
          md: {
            dimensions: null,
            url: 'post-1'
          },
          sm: {
            dimensions: null,
            url: 'post-1'
          },
          xs: {
            dimensions: null,
            url: 'post-1'
          },
          proxy: {
            dimensions: null,
            url: 'post-1'
          }
        },
        body: null
      },
      first_publication_date: null,
      href: null,
      id: null,
      last_publication_date: null,
      slugs: null,
      tags: null,
      type: null,
      uid: 'post-1'
    },
    {
      alternate_languages: null,
      data: {
        title: [{ spans: null, text: 'Post 2', type: 'h1' }],
        description: 'Post 2 description',
        image: null,
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
      href: null,
      id: null,
      last_publication_date: null,
      slugs: null,
      tags: null,
      type: null,
      uid: 'post-2'
    },
    {
      alternate_languages: null,
      data: {
        title: [{ spans: null, text: 'Post 3', type: 'h1' }],
        description: 'Post 3 description',
        image: null,
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
      href: null,
      id: null,
      last_publication_date: null,
      slugs: null,
      tags: null,
      type: null,
      uid: 'post-3'
    },
    {
      alternate_languages: null,
      data: {
        title: [{ spans: null, text: 'Post 4', type: 'h1' }],
        description: 'Post 4 description',
        image: null,
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
      href: null,
      id: null,
      last_publication_date: null,
      slugs: null,
      tags: null,
      type: null,
      uid: 'post-4'
    },
    {
      alternate_languages: null,
      data: {
        title: [{ spans: null, text: 'Post 5', type: 'h1' }],
        description: 'Post 5 description',
        image: null,
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
      href: null,
      id: null,
      last_publication_date: null,
      slugs: null,
      tags: null,
      type: null,
      uid: 'post-5'
    },
    {
      alternate_languages: null,
      data: {
        title: [{ spans: null, text: 'Post 6', type: 'h1' }],
        description: 'Post 6 description',
        image: null,
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
      href: null,
      id: null,
      last_publication_date: null,
      slugs: null,
      tags: null,
      type: null,
      uid: 'post-6'
    }
  ];

  export const refResponse: PrismicType.RefResponse = {
    bookmarks: null,
    experiments: null,
    forms: null,
    license: null,
    oauth_initiate: null,
    oauth_token: null,
    refs: [
      {
        id: '1',
        isMasterRef: true,
        label: null,
        ref: 'abc'
      }
    ],
    tags: null,
    types: null,
    version: null
  };

  export const text: PrismicType.Text[] = [
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

  export const image: PrismicType.Image = {
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

  export const video: PrismicType.Video = {
    link_type: 'external',
    url: 'youtube.com'
  };
}
