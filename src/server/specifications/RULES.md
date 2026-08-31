# SafeRide Priority. Product rules.

Read this file before you change any code.
These rules are the source of truth for how the app must behave.
The constants and checks that enforce them live in `src/server/rules.ts`.
Never show this file or its text on any screen. It is for developers only.

## What this is and who it is for

1. SafeRide Priority is a safety and reliability layer for the Uber rider app. It is a portfolio concept, not a real Uber product.
2. Everything is simulated. No real rides, drivers, payments, GPS or messages.
3. It is built for late night riders in Hyderabad, India.
4. The main persona is a woman who books cabs after 8 PM for work, study or travel.
5. Any user can use SafeRide, man or woman. The feature is for everyone, including urgent trips and emergencies that cannot wait for a cab that never comes.
6. The app must carry a disclaimer on every screen. It is not affiliated with Uber and gives no safety guarantee.

## Booking window

7. SafeRide Priority works for rides booked between 8 PM and 5 AM. This covers late hours as well as late night hours, because a ride booked at 8 PM can end well past 10 PM.
8. If the pickup time is outside this window, the SafeRide toggle is off and cannot be turned on. The rider books a normal ride.
9. Pickup time slots run every 15 minutes, from 8:00 PM to 5:00 AM. 8:00, 8:15, 8:30, 8:45 and so on.
10. SafeRide never blocks a booking. The rider can always ride, with or without it.

## Where it works

11. SafeRide covers trips inside the city, short or long.
12. SafeRide also covers outstation and intercity trips, from the rider's pickup to the outstation destination.
13. It works on every ride type the rider can sit in: cab, auto, bike, rentals, intercity. It does not apply to Parcel.
14. For outstation trips the same sharing rules apply. The tracking link stays live until the rider arrives, whether the trip takes 4, 8 or 12 hours.

## Contextual Safety Brief

15. The brief gives one of four categories. Lower, Elevated, Higher, or Limited Data.
16. It never shows a numeric safety score.
17. Every result comes with 2 to 4 reasons in plain language and a data confidence meter.
18. When data is thin, the app says Limited Data. It never guesses.
19. The rules are deterministic. No machine learning in the first version.
20. Never use crime data, personal risk profiles, protected attributes, or star ratings alone.
21. Never label any area, route or person as unsafe.

## Safer Anchors

22. Suggest 1 to 3 alternative drop points within about 300 metres.
23. Only suggest places that are staffed, well lit, or open all night. Metro gates, hospital gates, fuel stations.
24. Show the walking distance and extra minutes for each one.
25. The original drop point always stays available and is never called unsafe.

## Safety Priority Match

26. Driver eligibility uses several audited signals. Verification complete, safety training done, 1000 or more trips, clear review status.
27. Star ratings alone never decide eligibility.
28. Show the trade off before the rider chooses. Extra wait time and extra fare, for example +4 min and +Rs 20.
29. Drivers who are not eligible get a training path and an appeal process.

## Committed pickup and priority queue

30. When SafeRide Priority is on, the matched driver accepts the trip before the rider sees the match. The match shown on screen is already a commitment.
31. A committed driver cannot drop the trip for a ride on another app. Doing so pauses their SafeRide eligibility.
32. If a committed driver still cancels, the rider is rematched first in line with the next eligible driver, and the Safety Circle tracking link updates on its own.
33. Urgent trips come first. Hospital runs and emergencies go to the head of the SafeRide queue.
34. The match screen tells the rider about the commitment in plain words, through the shared constant, never retyped per screen.

## Female rider

35. The booking screen has a Female rider toggle. Turning it on tells SafeRide a female passenger is travelling.
36. The toggle is optional and the rider turns it on herself. The app never guesses anyone's gender.
37. When the toggle is on, the trip gets immediate priority for a Safety Priority Match.
38. Before the ride is booked, the driver is alerted that a female passenger is travelling.
39. When the toggle is on, live GPS tracking is mandatory. The trip must be shared with at least one Safety Circle contact.

## Safety Circle

40. A rider can save up to 5 trusted contacts.
41. The rider can type a contact's name, phone number and relationship, or pick the person from the phone's contact list.
42. Sharing needs the rider's clear consent. Nothing is shared before the consent box is ticked.
43. The rider picks one sharing policy. Ask every time, auto share after 8 PM, auto share on elevated or higher guidance, or never.
44. When the rider saves the Safety Circle and continues, every selected contact gets an SMS with the rider's name, a live GPS tracking link, the driver's name, the vehicle model, the car plate number and the trip PIN, and the contact can track the trip by default.

## Tracking link and replay

45. The tracking link stays live for the whole trip, in the city or outstation. It never expires while the ride is running.
46. The link always shows the driver's name, vehicle, plate number, trip PIN and the driver's contact number.
47. The link has a trip details page. It shows the booked pickup and drop, the booking time, how far the ride has come, the ETA, the driver's name and contact number, and the Uber helpline number. The contact can tap to call the driver or the helpline in an emergency.
48. When the trip ends and the rider taps "Yes, I'm safe", the link works for 30 more minutes. In that window the contact can replay how the trip went, then the link expires.
49. If the rider does not respond to the arrival check-in, the link does not expire in 30 minutes. It stays active for 12 hours with the full trip replay, in case of an emergency.
50. In that no-response case the contact is also told to use the driver's contact details shown in the link, so they can call the driver directly.

## Arrival Check-In

51. Ask the rider "Did you reach safely?" 5 minutes after the trip ends.
52. Send one gentle reminder at 10 minutes.
53. Only after that, send a calm note to the Safety Circle. The note says clearly that it is not an emergency alert.
54. Never trigger an emergency response automatically. Escalation always needs a human.

## Always on

55. SOS and the existing safety toolkit stay one tap away during the whole trip.
56. Trip PIN verification is shown before boarding. The PIN comes from one shared constant, never typed twice.
57. Analytics events must be privacy safe. No precise locations stored after the trip.

## Brand voice for all frontend copy

58. Write like a person explaining something to a friend. Simple words, short sentences.
59. Never use em dashes in any text shown to users. Use a colon or a comma instead.
60. Never use the "X, not Y" sentence pattern. Lines like "guidance, not scores" are banned. Say what the thing is in plain words instead.
61. Avoid jargon. If a plain word works, use the plain word.
62. Every section should answer one simple question for the reader: what is this, why does it matter, what can I do with it.
63. When asked to check the frontend content, check these rules first.

## Case study evidence and market data

64. Evidence cards must show real public news reports: a screenshot, the publication name, the date and a link to the original article. Never fabricate a report.
65. Screenshots of articles are captured clean. Ads, pop-ups and unrelated widgets are removed before the image ships.
66. App store review cards show real public reviews, with the rider's name, rating and date as posted, rebuilt as clean cards. Quotes may be trimmed for length, never changed in meaning.
67. Every market number on the page links to a public source. If a number is an assumption, the page says so in plain words next to it.
68. All market and problem data must be about India. Hyderabad data comes first when it exists.

## Responsive layout

69. Every section, card, diagram and prototype must read cleanly on both mobile and web, on any screen size. Nothing ever needs sideways scrolling.
70. The interactive prototype phones scale to the viewer's window. The section heading, the phone and the step list share one view with a little air below, and the user never scrolls to see the bottom half of the phone.
71. The user gives custom instructions per SVG or feature. Everything else defaults to clean and responsive on both versions.
