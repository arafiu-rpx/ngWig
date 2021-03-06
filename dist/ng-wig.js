/**
 * version: 1.1.10
 */
angular.module('ngWig', ['ngwig-app-templates']);

angular.module('ngWig').directive('ngWig', function () {

      return {
        scope: {
          content: '=ngWig'
        },
        restrict: 'A',
        replace: true,
        templateUrl: 'ng-wig/views/ng-wig.html',
        link: function (scope, element, attrs) {

          scope.originalHeight = element.outerHeight();
          scope.editMode = false;
          scope.autoexpand = !('autoexpand' in attrs) || attrs['autoexpand'] !== 'off';
          scope.cssPath = scope.cssPath ? scope.cssPath : 'css/ng-wig.css';

          scope.toggleEditMode = function() {
            scope.editMode = !scope.editMode;
          };

          scope.execCommand = function (command, options) {
            if(command ==='createlink'){
              options = prompt('Please enter the URL', 'http://');
            }
            scope.$emit('execCommand', {command: command, options: options});
          };

          scope.styles = [
            {name: 'Normal text', value: 'p'},
            {name: 'Header 1', value: 'h1'},
            {name: 'Header 2', value: 'h2'},
            {name: 'Header 3', value: 'h3'}
          ];

          scope.style = scope.styles[0];
        }
      }
    }
);


angular.module('ngWig').directive('ngWigEditable', function () {
      function init(scope, $element, attrs, ctrl) {
        var document = $element[0].ownerDocument;

        $element.attr('contenteditable', true);

        //model --> view
        ctrl.$render = function () {
          $element.html(ctrl.$viewValue || '');
        };

        //view --> model
        function viewToModel() {
          ctrl.$setViewValue($element.html());
          //to support old angular versions
          if(angular.version.minor < 3){
            scope.$apply();
          }

        }

        $element.bind('blur keyup change paste', viewToModel);

        scope.$on('execCommand', function (event, params) {
          $element[0].focus();

            var ieStyleTextSelection = document.selection,
              command = params.command,
              options = params.options;

          if (ieStyleTextSelection) {
            var textRange = ieStyleTextSelection.createRange();
          }

          document.execCommand(command, false, options);

          if (ieStyleTextSelection) {
            textRange.collapse(false);
            textRange.select();
          }

          viewToModel();
        });
      }

      return {
        restrict: 'A',
        require: 'ngModel',
        replace: true,
        link: init
      }
    }
);

/**
 * No box-sizing, such a shame
 *
 * 1.Calculate outer height
 * @param   bool    Include margin
 * @returns Number  Height in pixels
 *
 * 2. Set outer height
 * @param   Number          Height in pixels
 * @param   bool            Include margin
 * @returns angular.element Collection
 */
if (typeof angular.element.prototype.outerHeight !== 'function') {

angular.element.prototype.outerHeight = function() {
  function parsePixels(cssString) {
    if (cssString.slice(-2) === 'px') {
      return parseFloat(cssString.slice(0, -2));
    }
    return 0;
  }

  var includeMargin = false, height, $element = this.eq(0), element = $element[0];

  if (arguments[0] === true || arguments[0] === false || arguments[0] === undefined) {
    if (!$element.length) {
      return 0;
    }

    includeMargin = arguments[0] && true || false;

    if (element.outerHeight) {
      height = element.outerHeight;
    } else {
      height = element.offsetHeight;
    }
    if (includeMargin) {
      height += parsePixels($element.css('marginTop')) + parsePixels($element.css('marginBottom'));
    }
    return height;

  } else {
    if (!$element.length) {
      return this;
    }

    height = parseFloat(arguments[0]);

    includeMargin = arguments[1] && true || false;

    if (includeMargin) {
      height -= parsePixels($element.css('marginTop')) + parsePixels($element.css('marginBottom'));
    }

    height -= parsePixels($element.css('borderTopWidth')) + parsePixels($element.css('borderBottomWidth')) +
        parsePixels($element.css('paddingTop')) + parsePixels($element.css('paddingBottom'));

    $element.css('height', height + 'px');
    return this;
  }
};

}

angular.module('ngwig-app-templates', ['ng-wig/views/ng-wig.html']);

angular.module("ng-wig/views/ng-wig.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ng-wig/views/ng-wig.html",
    "<div class=\"ng-wig\">\n" +
    "  <ul class=\"nw-toolbar\">\n" +
    "    <li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button\" title=\"Header\" ng-click=\"execCommand('formatblock', '<h1>')\"><i class='fa fa-header'></i></button>\n" +
    "    </li><!--\n" +
    "    --><li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button \" title=\"Huge text\" ng-click=\"execCommand('fontSize', 7)\"><i class='fa fa-text-height huge'></i></button>\n" +
    "    </li><!--\n" +
    "    --><li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button \" title=\"Medium text\" ng-click=\"execCommand('fontSize', 5)\"><i class='fa fa-text-height medium'></i></button>\n" +
    "    </li><!--\n" +
    "    --><li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button \" title=\"Small text\" ng-click=\"execCommand('fontSize', 1)\"><i class='fa fa-text-height small'></i></button>\n" +
    "    </li><!--\n" +
    "    --><li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button \" title=\"Unordered List\" ng-click=\"execCommand('insertunorderedlist')\"><i class='fa fa-list-ul'></i></button>\n" +
    "    </li><!--\n" +
    "    --><li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button \" title=\"Ordered List\" ng-click=\"execCommand('insertorderedlist')\"><i class='fa fa-list-ol'></i></button>\n" +
    "    </li><!--\n" +
    "    --><li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button\" title=\"Bold\" ng-click=\"execCommand('bold')\"><i class='fa fa-bold'></i></button>\n" +
    "    </li><!--\n" +
    "    --><li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button\" title=\"Italic\" ng-click=\"execCommand('italic')\"><i class='fa fa-italic'></i></button>\n" +
    "    </li><!--\n" +
    "    --><li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button \" title=\"Underline\" ng-click=\"execCommand('underline')\"><i class='fa fa-underline'></i></button>\n" +
    "    </li><!--\n" +
    "    --><li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button \" title=\"Strike through\" ng-click=\"execCommand('strikeThrough')\"><i class='fa fa-strikethrough'></i></button>\n" +
    "    </li><!--\n" +
    "    --><li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button \" title=\"Undo\" ng-click=\"execCommand('undo')\"><i class='fa fa-undo'></i></button>\n" +
    "    </li><!--\n" +
    "    --><li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button \" title=\"Redo\" ng-click=\"execCommand('redo')\"><i class='fa fa-repeat'></i></button>\n" +
    "    </li><!--\n" +
    "    --><li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button \" title=\"Justify left\" ng-click=\"execCommand('justifyLeft')\"><i class='fa fa-align-left'></i></button>\n" +
    "    </li><!--\n" +
    "    --><li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button \" title=\"Justify center\" ng-click=\"execCommand('justifyCenter')\"><i class='fa fa-align-center'></i></button>\n" +
    "    </li><!--\n" +
    "    --><li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button \" title=\"Justify right\" ng-click=\"execCommand('justifyRight')\"><i class='fa fa-align-right'></i></button>\n" +
    "    </li><!--\n" +
    "    --><li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button \" title=\"Justify full\" ng-click=\"execCommand('justifyFull')\"><i class='fa fa-align-justify'></i></button>\n" +
    "    </li><!--\n" +
    "    --><li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button \" title=\"Indent\" ng-click=\"execCommand('indent')\"><i class='fa fa-indent'></i></button>\n" +
    "    </li><!--\n" +
    "    --><li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button \" title=\"Outdent\" ng-click=\"execCommand('outdent')\"><i class='fa fa-outdent'></i></button>\n" +
    "    </li><!--\n" +
    "    --><li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button \" title=\"Subscript\" ng-click=\"execCommand('subscript')\"><i class='fa fa-subscript'></i></button>\n" +
    "    </li><!--\n" +
    "    --><li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button \" title=\"Superscript\" ng-click=\"execCommand('superscript')\"><i class='fa fa-superscript'></i></button>\n" +
    "    </li><!--\n" +
    "    --><li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button\" title=\"link\" ng-click=\"execCommand('createlink')\"><i class='fa fa-link'></i></button>\n" +
    "    </li><!--\n" +
    "    --><li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button\" title=\"unlink\" ng-click=\"execCommand('unlink')\"><i class='fa fa-unlink'></i></button>\n" +
    "    </li><!--\n" +
    "    --><li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button\" title=\"Image\" ng-click=\"execCommand('insertImage')\"><i class='fa fa-image'></i></button>\n" +
    "    </li><!--\n" +
    "    --><li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button\" title=\"remove format selection\" ng-click=\"execCommand('removeFormat', false, '')\"><i class='fa fa-ban'></i></button>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "\n" +
    "  <div class=\"nw-editor-container\">\n" +
    "    <div class=\"nw-editor\">\n" +
    "      <textarea class=\"nw-editor__src\" ng-show=\"editMode\" ng-model=\"content\"></textarea>\n" +
    "      <div ng-class=\"{'nw-invisible': editMode, 'nw-autoexpand': autoexpand}\" class=\"nw-editor__res\" ng-model=\"content\" ng-wig-editable></div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
