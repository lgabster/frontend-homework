this["HBTemplates"] = this["HBTemplates"] || {};
this["HBTemplates"]["index"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <h1 class=\"page-header\">Hello "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.username : stack1), depth0))
    + "</h1>\n\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.githubRepos : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <div class=\"row\">\n            <div class=\"panel\">\n                <div class=\"panel-heading\">\n                    <a class=\"\" href=\""
    + alias4(((helper = (helper = helpers.html_url || (depth0 != null ? depth0.html_url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"html_url","hash":{},"data":data}) : helper)))
    + "\"><h2>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h2></a>\n                    <h2>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</h2>\n                </div>\n                <div class=\"panel-body\">\n                    <span>"
    + alias4(((helper = (helper = helpers.created_at || (depth0 != null ? depth0.created_at : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"created_at","hash":{},"data":data}) : helper)))
    + "</span>\n                </div>\n            </div>\n        </div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "        <h2>No repos</h2>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "    <h1 class=\"page-header\">Main</h1>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<button id=\"getrepos\">Get repos</button>\n\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.user : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + "\n\n";
},"useData":true});
this["HBTemplates"]["login"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1 class=\"page-title\">\n	Login with your user\n</h1>\n<div class=\"lead\">\n	<form class=\"form-inline\" action=\"/login\" method=\"POST\">\n		<div class=\"form-group\">\n		    <input class=\"form-control\" type=\"text\" name=\"username\" placeholder=\"Username\">\n		    <input class=\"form-control\" type=\"password\" name=\"password\" placeholder=\"Password\">\n		    <input class=\"btn btn-primary\" type=\"submit\" value=\"Submit\">\n	    </div>\n	</form>\n</div>";
},"useData":true});
this["HBTemplates"]["main"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<!DOCTYPE html>\n<html>\n<head>\n    <meta charset=\"utf-8\">\n    <title>Frontend Homework</title>\n\n    <link rel=\"stylesheet\" href=\"styles/vendor/bootstrap/dist/css/bootstrap.css\">\n    <link rel=\"stylesheet\" href=\"dist/css/main.css\">\n\n    <script src=\"http://localhost:35729/livereload.js\"></script>\n\n    <script src=\"js/vendor/jquery-2.2.4.js\"></script>\n    <script src=\"js/vendor/handlebars-4-0-5.js\"></script>\n    <script src=\"js/vendor/waypoint.js\"></script>\n</head>\n<body>\n    <header>\n"
    + ((stack1 = container.invokePartial(partials.navigation,depth0,{"name":"navigation","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    </header>\n\n    <main class=\"container\">\n        \n        "
    + ((stack1 = ((helper = (helper = helpers.body || (depth0 != null ? depth0.body : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"body","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n\n    </main>\n\n    <div id=\"waypoint\">WAYPOINT</div>\n    \n    <footer>\n"
    + ((stack1 = container.invokePartial(partials.footer,depth0,{"name":"footer","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    </footer>\n\n\n\n    <script src=\"dist/templates/template.js\"></script>\n    \n    <script src=\"dist/js/main.js\"></script>\n</body>\n</html>";
},"usePartial":true,"useData":true});
this["HBTemplates"]["footer"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "FOOTER";
},"useData":true});
this["HBTemplates"]["modal"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1>I'm a modal!!!</h1>";
},"useData":true});
this["HBTemplates"]["navigation"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "            <li class=\"active\"><a href=\"/logout\">Logout</a></li> \n";
},"3":function(container,depth0,helpers,partials,data) {
    return "            <li class=\"active\"><a href=\"/login\">Login</a></li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<nav class=\"navbar navbar-default\">\n    <div class=\"container-fluid\">\n        <div class=\"navbar-header\">\n            <a class=\"navbar-brand\" href=\"/\">Node Homework</a>\n        </div>\n        <ul class=\"nav navbar-nav\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.user : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "        </ul>\n    </div>\n</nav>";
},"useData":true});