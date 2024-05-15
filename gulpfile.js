const gulp = require('gulp');
const replace = require('gulp-replace-task');
const { series } = require('gulp');

gulp.task('lockdown', function () {
  return gulp
    .src([
      'sections/collage.liquid',
      'sections/collapsible-content.liquid',
      'sections/collection-list.liquid',
      'sections/contact-form.liquid',
      'sections/featured-blog.liquid',
      'sections/featured-collection.liquid',
      'sections/featured-product.liquid',
      'sections/image-banner.liquid',
      'sections/image-with-text.liquid',
      'sections/main-product.liquid',
      'sections/multicolumn.liquid',
      'sections/multirow.liquid',
      'sections/newsletter.liquid',
      'sections/rich-text.liquid',
      'sections/slideshow.liquid',
      'sections/video.liquid',
      'sections/announcement-bar.liquid',
      'sections/footer.liquid',
      'sections/header.liquid',
    ])
    .pipe(
      replace({
        patterns: [
          {
            match:
              /{\s*("type": "header",)\s*("content": "t:sections.all.tailwind.heading")(.*?|\n)[^},]*/,
            replacement:
              '{"type": "header","content": "t:sections.all.tailwind.heading"},{"type": "paragraph","content": "Tailwind fields are not editable through the admin at this stage. Please contact a Trellis engineer if changes are needed."',
          },
          {
            match: /("type": "text",)\s*("id": "twcss_)/g,
            replacement: '"type": "checkbox",$2',
          },
        ],
        usePrefix: false,
      }),
    )
    .pipe(gulp.dest('sections'));
});

exports.default = series('lockdown');
