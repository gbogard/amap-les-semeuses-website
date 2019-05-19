import CMS from 'netlify-cms'

import BlogPostPreview from './preview-templates/BlogPostPreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'
import AboutPagePreview from './preview-templates/AboutPagePreview'

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)