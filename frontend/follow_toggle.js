class FollowToggle {
  constructor(DOMElement, options) {
    this.$el = $(DOMElement);
    this.userID = this.$el.data("user-id") || options.userID;
    this.followState = this.$el.data("initial-follow-state") || options.followState;
    this.render();
    this.handleClick();

  }

  render() {
    // debugger
    if (this.followState === "following" ||
        this.followState === "unfollowing") {
      this.$el.prop("disabled", true);
    }

    if (this.followState === "followed") {
      this.$el.text("Unfollow!");
      this.$el.prop("disabled", false);
    } else if (this.followState === "unfollowed"){
      this.$el.text("Follow!");
      this.$el.prop("disabled", false);
    }
  }

  handleClick() {
    this.$el.on("click", event => {
      event.preventDefault();

      if (this.followState === "followed") {
        this.followState = "unfollowing";
        this.render();
        $.ajax({
          url: `/users/${this.userID}/follow`,
          method: "DELETE",
          dataType: 'json',
          success: () => {
            this.followState = 'unfollowed';
            this.render();
          }
        });
      } else {
        this.followState = "following";
        this.render();
        $.ajax({
          url: `/users/${this.userID}/follow`,
          method: "POST",
          dataType: 'json',
          success: () => {
            this.followState = 'followed';
            this.render();
          }
        });
      }
    });
  }
}




module.exports = FollowToggle;
