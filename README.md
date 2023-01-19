# Todo-List

TOP project with html, css and JS. I'm using modules and classes to practice.

Update: I think I could make things simpler by coding the html for editing and showing the task directly into the html file and write the related function into render.js module or into index.js file.
Since the object of this project is to practice using modules and classes, I'll leave things as they are.

Final Considerations:
-Near the end of the project I understood how you can pass an instance of a class to other modules. I believe I can make the code simpler by rewriting it from the beginning.
-deleteTask is using the name of the task which isn't good. I should add a "id" property to task and delete the task using the id.
-a lot of functions could be merged together and with an argument i could select what to do. For example showInfoForm and showEditForm can be showForm(info/edit).
-I can improve the way i use localstorage.
