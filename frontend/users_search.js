const FollowToggle = require('./follow_toggle.js');

class UsersSearch {
  constructor(DOMElement) {
    this.$nav = $(DOMElement);
    this.$ul = $('.users');
    this.$textInput = $('.text-input');
    this.$textInput.on("input", this.handleInput.bind(this));
  }

  handleInput(event){
    event.preventDefault();
    $.ajax({
      url: "/users/search",
      dataType: 'json',
      data: {query: this.$textInput.val()},
      method: "GET",
      success: (users) => {
        this.renderResults(users);
      },
    });
  }

  renderResults(users) {
    this.$ul.empty();
    for (let i = 0; i < users.length; i++) {
      let $li = $('<li></li>');
      let $button = $('<button></button>');
      // $button.attr('user-id', `${users[i]['id']}`);
      //find users state and id
      let options = {};
      options["userID"] = `${users[i]['id']}`;
      if (users[i].followed === false) {
        options["followState"] = "unfollowed";
      } else {
        options["followState"] = "followed";
      }




      new FollowToggle($button, options);
      $li.append($button);
      let $a = (`<a href="/users/${users[i]['id']}">${users[i]['username']}</a>`);
      $li.append($a);
      this.$ul.append($li);
    }
  }
}
module.exports = UsersSearch;
