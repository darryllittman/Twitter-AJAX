const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js');

$(() => {
  const $buttons = $('.follow-toggle');
  $buttons.each((idx, button) => {
    new FollowToggle(button);
  });

  const $usersSearch = $('.users-search');
  $usersSearch.each((idx, nav) => {
    new UsersSearch(nav);
  });
 }
);
