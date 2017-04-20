var slice = [].slice;

var parseTestSteps = function(body, index) {
  var j, ref, results, steps;

  if (index == null) {
    index = 1;
  }
  steps = [];
  (function() {
    results = [];
    for (var j = index, ref = body.length - 1; index <= ref ? j <= ref : j >= ref; index <= ref ? j++ : j--){ results.push(j); }
    return results;
  }).apply(this).forEach(function(i) {
    var asserts, description, ref, s, step;
    step = body[i];
    if (step.length) {
      if (step.indexOf('redirect') > -1) {
        s = step.split('\n');
        s.shift();
        step = s.join('\n');
      }
      ref = step.split('\n'), description = ref[0], asserts = 2 <= ref.length ? slice.call(ref, 1) : [];
      if (description.length) {
        step = {
          description: description,
          asserts: asserts[0].trim().split('? ')
        };
        return steps.push(step);
      }
    }
  });
  return steps;
};

var parseFileHeader = function(header) {
  var id, startUri, tag;
  id = header[0].split(' ')[1];
  startUri = header[2].split(':')[1].trim();
  tag = header[3].split(':')[1];
  if (id && startUri && tag) {
    return {
      id: id,
      startUri: startUri,
      tag: tag
    };
  } else {
    throw new Error('Parse failed! while parsing file header');
  }
};

var parseEmbeddedTestInfo = function(embeddedInfo) {
  var embedded;
  if (embeddedInfo[1].indexOf('-') !== 0) {
    return null;
  }
  return embedded = {
    name: embeddedInfo[0].split(' ')[1],
    id: embeddedInfo[1].split(' ')[1]
  };
};

module.exports = {
  parseTestSteps: parseTestSteps,
  parseFileHeader: parseFileHeader,
  parseEmbeddedTestInfo: parseEmbeddedTestInfo
};
