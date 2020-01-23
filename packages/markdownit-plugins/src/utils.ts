const removeParameter = (url: string, parameter: string) =>
{
  let resultUrl = url;
  let fragment = url.split('#');
  let urlparts= fragment[0].split('?');

  if (urlparts.length>=2)
  {
    let urlBase=urlparts.shift(); //get first part, and remove from array
    let queryString=urlparts.join("?"); //join it back up

    let prefix = encodeURIComponent(parameter)+'=';
    let pars = queryString.split(/[&;]/g);
    for (let i= pars.length; i-->0;) {               //reverse iteration as may be destructive
      if (pars[i].lastIndexOf(prefix, 0)!==-1) {   //idiom for string.startsWith
        pars.splice(i, 1);
      }
    }
    resultUrl = urlBase + (pars.length > 0 ? '?' + pars.join('&') : '');
    if (fragment[1]) {
      resultUrl += "#" + fragment[1];
    }
  }

  return resultUrl;
}

export {
  removeParameter
}
