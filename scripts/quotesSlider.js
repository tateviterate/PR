/**
 *   QuotesSlider CLASS
 * */
function QuotesSlider(config) {
    if(!config || typeof config !== 'object') return;

    // defining object properties
    this.quotes = [];
    this.quotesSliderIndex = 0;
    this.quotesSliderIntID = 0;
    this.quotesSliderDelay = config.delay || 5000;

    // caching elements
    this.$message = $('.qs-message');
    this.$name = $('.qs-name');
    this.$role = $('.qs-role');
    this.$photo = $('.qs-photo');
    this.$arrowLeft = $('.qs-arrow-left');
    this.$arrowRight = $('.qs-arrow-right');


    // initializing
    this.init();
}

QuotesSlider.prototype.init = function () {
    // get quotes from quotes.json
    this.getQuotes();

    // attach events to slider element
    this.attachEvents();
};

QuotesSlider.prototype.attachEvents = function () {
    var self = this;

    this.$arrowLeft.click(function () {
        clearInterval(self.quotesSliderIntID);
        var index = --self.quotesSliderIndex;
        if(index < 0) index = self.quotesSliderIndex = self.quotes.length - 1;
        var currentQuote = self.quotes[index];

        // change slider content
        self.$message.text(currentQuote.message);
        self.$name.text(currentQuote.name);
        self.$role.text(currentQuote.role);
        self.$photo.attr('src', currentQuote.photo);

        // setting up timer
        self.quotesSliderIntID = setInterval(function(){
            self.changeSlide();
        }, self.quotesSliderDelay);
    });

    this.$arrowRight.click(function () {
        // destroying timer
        clearInterval(self.quotesSliderIntID);
        var index = ++self.quotesSliderIndex;
        if(index == self.quotes.length) index = self.quotesSliderIndex = 0;
        var currentQuote = self.quotes[index];

        // change slider content
        self.$message.text(currentQuote.message);
        self.$name.text(currentQuote.name);
        self.$role.text(currentQuote.role);
        self.$photo.attr('src', currentQuote.photo);

        // setting up timer
        self.quotesSliderIntID = setInterval(function(){
            self.changeSlide();
        }, self.quotesSliderDelay);
    });
};

QuotesSlider.prototype.changeSlide = function() {
    if(++this.quotesSliderIndex >= this.quotes.length) this.quotesSliderIndex = 0;
    var index = this.quotesSliderIndex;
    var currentQuote = this.quotes[index];

    // change slider content
    this.$message.text(currentQuote.message);
    this.$name.text(currentQuote.name);
    this.$role.text(currentQuote.role);
    this.$photo.attr('src', currentQuote.photo);
};

QuotesSlider.prototype.startSlider = function() {
    var index = this.quotesSliderIndex;
    var currentQuote = this.quotes[index];

    // change slider content
    this.$message.text(currentQuote.message);
    this.$name.text(currentQuote.name);
    this.$role.text(currentQuote.role);
    this.$photo.attr('src', currentQuote.photo);

    var self = this;
    // setting up timer
    this.quotesSliderIntID = setInterval(function(){
        self.changeSlide();
    }, this.quotesSliderDelay);
};

QuotesSlider.prototype.getQuotes = function() {
    var self = this;

    $.getJSON('resource/quotes.json')
        .then(function (data) {
            // save data into quotes
            self.quotes = data;

            // starting slider and seting up timer
            self.startSlider();
        });
};

QuotesSlider.prototype.destroy = function () {
    clearInterval(this.quotesSliderIntID);
};

/**
 *   end QuotesSlider CLASS
 * */