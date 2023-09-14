const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, './snippets'); // Replace 'YOUR_DIRECTORY_PATH' with your directory's relative path.

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.error('Unable to scan directory:', err);
  }

  const iconFiles = files.filter(
    (file) => file.startsWith('icon-') && file.endsWith('.liquid'),
  );

  const options = iconFiles.map((file) => ({
    value: file.replace('.liquid', ''), // Removing the .liquid extension
    label: file
      .replace('icon-', '')
      .replace('.liquid', '')
      .split('-')
      .join(' '), // Making it human-readable
  }));

  const schema = {
    type: 'select',
    id: 'icon_selection',
    label: 'Select an Icon',
    options: options,
    default: options[0]?.value || '', // Defaulting to the first icon if available
  };

  // Generate Liquid markup
  let liquidMarkup = '{% case settings.icon_selection %}\n';
  iconFiles.forEach((file) => {
    const iconName = file.replace('.liquid', '');
    liquidMarkup += `  {% when '${iconName}' %}\n    {% render '${iconName}' %}\n\n`;
  });
  liquidMarkup +=
    '  {%- else -%}\n    <!-- Default action if no icon matches -->\n    <p>No Icon Selected</p>\n{% endcase %}';

  console.log('JSON Schema:\n', JSON.stringify(schema, null, 4)); // Pretty print JSON
  console.log('\nLiquid Markup:\n', liquidMarkup);
});
