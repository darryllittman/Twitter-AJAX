class TweetCompose {
  constructor(){

    this.$input = $('.tweet-compose');
    this.$input.on("submit", this.submit.bind(this));
    this.charsRemaining = 140;
    this.$textarea = this.$input.find('textarea');
    this.$textarea.on("input", this.handleInput.bind(this));
  }


  handleSuccess(tweet){
    $(':input').prop('disabled', false);
    this.clearInput();
    let $ul = this.$input.data("tweets-ul");
    let $li = $('<li></li>');

    let content = tweet.stringify();

    $li.text(content);
    $ul.append($li);
  }

  handleInput(event){
    // debugger
    event.preventDefault();
    this.charsRemaining -= 1;
    console.log(this.charsRemaining);
    this.$input.find('.chars-left').text('heello');
  }

  submit(event){
    event.preventDefault();
    let formContents = this.$input.serializejson();
    $(':input').prop('disabled', true);
    $.ajax({
      url: '/tweets',
      dataType: 'json',
      data: formContents,
      method: "POST",
      success: (tweet) => {
        this.handleSuccess(tweet);
      }
    });

  }

  clearInput() {
    $('.tweet-compose > textarea').empty();
  }
}
