angular.module('app-templates', ['ng-wig/views/ng-wig.html']);

angular.module("ng-wig/views/ng-wig.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ng-wig/views/ng-wig.html",
    "<div class=\"ngwig\">\n" +
    "  <div class=\"ngwig-header\">\n" +
    "    <div class=\"ngwig-control bold\" title=\"Bold\" ng-click=\"execCommand('bold')\"></div>\n" +
    "    <div class=\"ngwig-control italic\" title=\"Italic\" ng-click=\"execCommand('italic')\"></div>\n" +
    "    <div class=\"ngwig-control underline\" title=\"Underline\" ng-click=\"execCommand('underline')\"></div>\n" +
    "    <div class=\"ngwig-divider\"></div>\n" +
    "    <div class=\"ngwig-control paragraph\" title=\"Paragraph\" ng-click=\"execCommand('formatblock', '<p>')\"></div>\n" +
    "    <div class=\"ngwig-control h1\" title=\"H1\" ng-click=\"execCommand('formatblock', '<h1>')\"></div>\n" +
    "    <div class=\"ngwig-control h2\" title=\"H2\" ng-click=\"execCommand('formatblock', '<h2>')\"></div>\n" +
    "    <div class=\"ngwig-control h3\" title=\"H3\" ng-click=\"execCommand('formatblock', '<h3>')\"></div>\n" +
    "    <div class=\"ngwig-divider\"></div>\n" +
    "    <div class=\"ngwig-control orderedlist\" title=\"Insert Ordered List\" ng-click=\"execCommand('insertorderedlist')\"></div>\n" +
    "    <div class=\"ngwig-control unorderedlist\" title=\"Insert Unordered List\" ng-click=\"execCommand('insertunorderedlist')\"></div>\n" +
    "    <div class=\"ngwig-divider\"></div>\n" +
    "    <div class=\"ngwig-control leftalign\" title=\"Left Align\" ng-click=\"execCommand('justifyleft')\"></div>\n" +
    "    <div class=\"ngwig-control centeralign\" title=\"Center Align\" ng-click=\"execCommand('justifycenter')\"></div>\n" +
    "    <div class=\"ngwig-control rightalign\" title=\"Right Align\" ng-click=\"execCommand('justifyright')\"></div>\n" +
    "    <div class=\"ngwig-control blockalign\" title=\"Block Justify\" ng-click=\"execCommand('justifyfull')\"></div>\n" +
    "    <div ng-show=\"debug\" class=\"ngwig-control blockalign\" title=\"Block Justify\" ng-click=\"editMode = !editMode\"></div>\n" +
    "  </div>\n" +
    "  <div>\n" +
    "    <textarea class=\"ngwig-editor\" ng-show=\"editMode\" ng-model=\"content\"></textarea>\n" +
    "    <iframe class=\"ngwig-editor\" ng-hide=\"editMode\" ng-model=\"content\" ng-wig-editable></iframe>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);