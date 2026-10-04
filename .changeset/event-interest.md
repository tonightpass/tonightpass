---
"tonightpass": patch
---

Add the event interest endpoint, so a visitor can say they want to go to an
event we cannot sell.

866 public upcoming events, 3 of them bookable: every other page was a dead
end. `POST /organizations/@:slug/events/:slug/interests` is public on purpose,
since demanding an account before we can serve anyone is what produced
hundreds of empty signups. Events gain `interestsCount`, which is the only
figure worth putting in front of the organiser of an event we do not yet sell.
