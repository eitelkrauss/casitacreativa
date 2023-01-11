import { defineConfig } from 'astro/config';
import NetlifyCMS from 'astro-netlify-cms';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  integrations: [NetlifyCMS({
    config: {
      // Use Netlify’s “Git Gateway” authentication and target our default branch
      backend: {
        name: 'git-gateway',
        branch: 'latest'
      },
      // Configure where our media assets are stored & served from
      // only inject the widget on the admin route
      disableIdentityWidgetInjection: false,
      // Configure the content collections
      collections: [
        {
          name: 'slides',
          label: 'Slides',
          label_singular: 'Slide',
          folder: 'src/pages/slides',
          media_folder: '/public',
          public_folder: '/',
          create: true,
          delete: true,
          fields: [{
            name: 'title',
            widget: 'string',
            label: 'Slide Title'
          }, {
            name: 'description',
            widget: 'string',
            label: 'Description'
          }, {
            name: 'image',
            widget: 'image',
            label: 'Slide Image'
          }]
        },
        {
          name: 'posts',
          label: 'Blog Posts',
          label_singular: 'Blog Post',
          folder: 'src/pages/posts',
          media_folder: 'public/assets/blog',
          public_folder: '/assets/blog',
          create: true,
          delete: true,
          fields: [{
            name: 'title',
            widget: 'string',
            label: 'Post Title'
          }, {
            name: 'publishDate',
            widget: 'datetime',
            format: 'DD MMM YYYY',
            date_format: 'DD MMM YYYY',
            time_format: false,
            label: 'Publish Date'
          }, {
            name: 'author',
            widget: 'string',
            label: 'Author Name',
            required: false
          }, {
            name: 'authorURL',
            widget: 'string',
            label: 'Author URL',
            required: false
          }, {
            name: 'description',
            widget: 'string',
            label: 'Description',
            required: false
          }, {
            name: 'body',
            widget: 'markdown',
            label: 'Post Body'
          }, {
            name: 'layout',
            widget: 'select',
            default: '../../layouts/BlogPost.astro',
            options: [{
              label: 'Blog Post',
              value: '../../layouts/BlogPost.astro'
            }]
          }]
        }
      ]
    },
    previewStyles: ['src/styles/blog.css']
  }), tailwind(), image({
    serviceEntryPoint: '@astrojs/image/sharp'
  })]
});