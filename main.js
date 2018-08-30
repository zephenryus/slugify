'use strict';

function Slugify(strings) {
    this.symbol = 'àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;';
    this.symbolReplacement = 'aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------';
    this.symbolPattern = new RegExp(this.symbol.split('').join('|'), 'g');

    if (strings) {
        return this.slugify(strings);
    }
}

Slugify.prototype.slugify = function (strings) {
    strings = this.parseStrings(strings);
    return this.compileSlugs(strings);
};

Slugify.prototype.parseStrings = function (string) {
    if (typeof string === 'string') {
        var strings = string.split("\n");
        return (typeof strings !== 'object')
            ? [strings]
            : strings;
    } else {
        return string;
    }
};

Slugify.prototype.compileSlugs = function (strings) {
    for (var index in strings) {
        if (strings.hasOwnProperty(index)) {
            var string = strings[index];

            if (typeof string === 'string') {
                console.log(string);
                string = string
                    .toString()
                    .trim()
                    .toLowerCase()
                    // Replace spaces with -
                    .replace(/\s+/g, '-')
                    // Replace special characters
                    .replace(this.symbolPattern, c => this.symbolReplacement.charAt(this.symbol.indexOf(c)))
                    // Replace & with ‘and’
                    .replace(/&/g, '-and-')
                    // Remove all non-word characters
                    .replace(/[^\w\-]+/g, '')
                    // Replace multiple — with single -
                    .replace(/--+/g, '-')
                    // Trim — from start of text .replace(/-+$/, '') // Trim — from end of text
                    .replace(/^-+/, '');
                console.log(string);
            }

            strings[index] = string;
        }
    }

    return this.encodeStrings(strings);
};



document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#slugify').addEventListener('click', function () {
        var input = document.querySelector('#strings-input');
        var output = document.querySelector('#strings-output');
        output.value = new Slugify(input.value);
    });
});