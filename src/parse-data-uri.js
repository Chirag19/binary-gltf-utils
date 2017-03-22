'use strict';

/**
 * Parses a data URI into a buffer, as well as retrieving its declared MIME type.
 *
 * @param {string} uri - a data URI (assumed to be valid)
 * @returns {Object} { buffer, mimeType }
 */
function parseDataUri(uri) {
  const dataIndex = uri.indexOf(',');

  let buffer, mimeType;
  if (uri.slice(dataIndex - 7, dataIndex) === ';base64') {
    buffer = new Buffer(uri.slice(dataIndex + 1), 'base64');
    mimeType = uri.slice(5, dataIndex - 7).trim();
  } else {
    buffer = new Buffer(decodeURIComponent(uri.slice(dataIndex + 1)));
    mimeType = uri.slice(5, dataIndex).trim();
  }

  if (!mimeType) mimeType = 'text/plain;charset=US-ASCII';
  else if (mimeType[0] === ';') mimeType = 'text/plain' + mimeType;

  return { buffer, mimeType };
}

module.exports = parseDataUri;
