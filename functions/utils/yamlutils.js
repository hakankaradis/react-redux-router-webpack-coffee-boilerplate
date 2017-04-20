var YamlUtils

var jsyaml = require('js-yaml');

var sanitize = function(content) {
  var i, len, line, newContent, ref;
  newContent = '';
  ref = content.split('\n');
  for (i = 0, len = ref.length; i < len; i++) {
    line = ref[i];
    newContent += (line.trimRight()) + "\n";
  }
  return newContent;
};

module.exports = YamlUtils = {
  yamlToJson: function(content, silent) {
    var contentObject, contentType, err;
    if (silent == null) {
      silent = false;
    }
    contentType = 'yaml';
    try {
      content = sanitize(content);
      contentObject = jsyaml.safeLoad(content);
      content = JSON.stringify(contentObject);
      contentType = 'json';
    } catch (_error) {
      err = _error;
      if (!silent) {
        console.error('[YamlToJson]', err);
      }
    }
    contentObject || (contentObject = {});
    return {
      content: content,
      contentType: contentType,
      contentObject: contentObject,
      err: err
    };
  }
};
