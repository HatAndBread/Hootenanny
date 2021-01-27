function forceHttps(req, res, next) {
  // protocol check, if http, redirect to https
  let ipV4 = req.connection.remoteAddress.replace(/^.*:/, '');
  if (ipV4 === '1' || req.get('X-Forwarded-Proto').indexOf('https') != -1) {
    console.log('https ✨');
    return next();
  } else {
    console.log('just http');
    res.redirect('https://' + req.hostname + req.url);
  }
}

module.exports = forceHttps;
