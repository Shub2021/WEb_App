var UserProfile = (function() {
    var token = "";
  
    var getToken = function() {
      return token;    // Or pull this from cookie/localStorage
    };
  
    var setToken = function(name) {
      token = name;     
      // Also set this in cookie/localStorage
    };
  
    return {
      getToken: getToken,
      setToken: setToken
    }
  
  })();
  
  export default UserProfile;
  