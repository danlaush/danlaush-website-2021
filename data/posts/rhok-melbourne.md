---
title: People focus in order to scale — RHoK Melbourne Summer 2017
date: "2017-11-29"
---

_**tl;dr: Hackathon for social good.** Existing solution was tailored to the technology, not the real problem. Built a client app, API, and serverless worker process to automate the hard parts and simplify the effort required to get things done._

Last weekend I worked with a great team at [Random Hacks of Kindness](http://www.rhokaustralia.org/melbourne/), a hackathon connecting changemakers (people with ideas or organisations for social impact) with hackers (people who turn ideas into reality).

My team supported Julie Gibson and her organisation [Hitnet](http://www.hitnet.com.au/), who manage 70+ touchscreen kiosks (called “hubs”) for marginalised communities that contain health and life advice — content co-created by those communities. **Access to information is critical to improving quality of life everywhere**, and it can be challenging to share this, especially with people in remote areas of Australia. It’s also important that the content delivered by these machines come from the communities that will benefit from them.

- I tend to write in lists. It helps me think.

## The situation

- Hitnet’s information kiosks are spread across the country and the content must be managed remotely.
- The content on the kiosks are videos and information like “The Diabetes Story” and “Our Lungs, Our Mob”. People are constantly creating new content, and the machines pull down updates from the cloud every day.
- Hitnet were struggling because it was complex to manage which content belonged on which hub, and required technical skills.
- The content for each hub is defined by an XML config file, one per hub, located on a cloud server. Each file had to be edited manually in a text editor to make changes.
- It was a time consuming process for the CEO, the person in the organisation with the most technical skill. It would also be difficult to scale — as Hitnet grow and manage more hubs across Australia, the work required to maintain them skyrockets.

## The approach

- We approached the problem by separating our concerns as much as possible.
- The actual sync functionality with the hubs is working decently well. Working with XML files adds a bit of complexity, but it’s a solution and it works. The machines themselves will be upgraded soon as well, so we didn’t want to jump on a moving train.
- Instead, we came back to the people — how could we make Julie and her team’s job easier, and let technology do the hard work?

> By focusing on what Julie actually needs to accomplish — get the right information to the right people — we learned that our way of thinking needed to change.

- The discussion was focused on how a person could easily put the right content modules onto the right hubs. The solution was revolving around the technology, not the other way around.
- “We’ll build a UI that enables users to put content modules into a hub” — why is this backwards? What the user is actually doing is going through the list of modules and deciding whether the module “matches” the hub somehow. The hub in the Woorabinda Health Clinic should contain information about health topics. A hub in a high school should contain information for teenagers. A hub in Laos should not contain information for Australians (Hitnet have begun to expand internationally).
- The system Julie is using requires her to think like a machine. She has to compare a set of criteria about content modules to be shown, one hub at a time, and create a perfectly formatted code document 70 times. Computers are great at this sort of thing.

> In order to stay **connected to Hitnet’s purpose** (helping people) and to **scale effectively**, we needed to focus on **systematising** the info people need and **automating** how it gets there.

- So we built an app.

## The solution

- **Frontend Client — React ([Github](https://github.com/RHoKAustralia/hitnet-ui))**
- Dan and Liza
- Users access a web application to manage the content modules and hubs. API-driven, client requires static assets only.
- **API — Nginx & Postgres**
- Ankit and Peter
- The client app interfaces with an API, storing the information in a database. It also keeps a log of changes to the content on each hub for auditing purposes (when & why was this added to this hub).
- Apparently there’s a way that Nginx and Postgres can work together to manage a REST API without an app in between. Who knew. [Ed: not Dan, that’s for sure]
- **Worker — Serverless Node on Google Cloud Platform ([Github](https://github.com/RHoKAustralia/hitnet-worker))**
- Shaun
- When triggered, either automatically on a schedule or by a “publish” command from the client app, the worker app fetches data from the API and processes it, generating XML files for each hub with the correct content modules.
- The hubs continue to check in as they always have, expecting the same XML file.

## Next steps

While we came close to a finished product on the weekend, there are some final pieces that need to go in place before the minimum viable product can be deployed and used.

### Minimum Viable Product

- **Environments**
    - Frontend on heroku
    - API in a container
- **Security**
    - Frontend — basic auth
    - API — IP restriction?
- **Functionality**
    - Iron out some endpoints between API and frontend
    - Ship with basic feature — on module page, decide which hubs that a module should be visible on.
- **Test**
- **Deploy!**

### Phase 2 Revenge of the Phase

- Security
    - Frontend — User login/accounts
    - API — User auth
- Tech
    - Will we need a server app running to manage user and API auth? Will also end up with business logic required to convert stored data to human and XML formats.
- Functionality
    - More matching criteria
    - Country/state/region, demographic, date range
    - Add custom criteria per module<>hub relationship
    - “This module should be shown on these 3 hubs, but on this hub it should only be visible from this date to that date.”
