this.HBTemplates=this.HBTemplates||{},this.HBTemplates.repo=Handlebars.template({1:function(a,e,n,l,t){var s,i=null!=e?e:{},r=n.helperMissing,p="function",o=a.escapeExpression;return'<div class="row">\n    <div class="panel">\n        <div class="panel-heading">\n            <a class="" href="'+o((s=null!=(s=n.html_url||(null!=e?e.html_url:e))?s:r,typeof s===p?s.call(i,{name:"html_url",hash:{},data:t}):s))+'"><h2>'+o((s=null!=(s=n.name||(null!=e?e.name:e))?s:r,typeof s===p?s.call(i,{name:"name",hash:{},data:t}):s))+"</h2></a>\n            <h2>"+o((s=null!=(s=n.description||(null!=e?e.description:e))?s:r,typeof s===p?s.call(i,{name:"description",hash:{},data:t}):s))+'</h2>\n        </div>\n        <div class="panel-body">\n            <span>'+o((s=null!=(s=n.created_at||(null!=e?e.created_at:e))?s:r,typeof s===p?s.call(i,{name:"created_at",hash:{},data:t}):s))+"</span>\n        </div>\n    </div>\n</div>\n"},3:function(a,e,n,l,t){var s,i=null!=e?e:{},r=n.helperMissing,p="function",o=a.escapeExpression;return'<a  id="fetcher" data-component="repo-fetcher" data-limit="'+o((s=null!=(s=n.repoLimit||(null!=e?e.repoLimit:e))?s:r,typeof s===p?s.call(i,{name:"repoLimit",hash:{},data:t}):s))+'" data-offset="'+o((s=null!=(s=n.repoOffset||(null!=e?e.repoOffset:e))?s:r,typeof s===p?s.call(i,{name:"repoOffset",hash:{},data:t}):s))+'"></a>\n'},compiler:[7,">= 4.0.0"],main:function(a,e,n,l,t){var s,i=null!=e?e:{};return(null!=(s=n.each.call(i,null!=e?e.repos:e,{name:"each",hash:{},fn:a.program(1,t,0),inverse:a.noop,data:t}))?s:"")+"\n"+(null!=(s=n["if"].call(i,null!=e?e.nextUrl:e,{name:"if",hash:{},fn:a.program(3,t,0),inverse:a.noop,data:t}))?s:"")},useData:!0});