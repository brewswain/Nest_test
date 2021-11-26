# Recommended File Exploration Order

### Assuming This is your first time Looking at Nest JS, I recc reading the files in this order so that my comments make the most sense:

---

1. main.ts
2. app.module.ts
3. app.controller.ts
4. app.service.ts

### This shows a very basic Overview of NestJS' default scaffolding. The event(s) files refer to some custom work done so they can be a bit more verbose, so it helps to understand the overarching Nest flow and how these files work together. Once that's done, let's dive into the event files:

---

1. event.entity.ts
2. events.controller.ts
3. create-event.dto.ts
4. update-event.dto.ts

---

#### PS If you don't want to see comments and you're just here for references, I have 2 folders in my `src` that have the code with no comments attached.