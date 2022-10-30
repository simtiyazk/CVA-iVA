## Synopsis
Html presentation for Veeva. Uses Gulp workflow: folder structure gerneration, es6, sass, handlebars for partials, npm for dependencies (no bower), local serve with live reload, ftp deployment.  

## Up and Running  
1. [install node.js](https://nodejs.org) if you don't have it.  
1. Install gulp globally if you don't have it: ```$ npm install -g gulp```  
1. navigate to the location of your project: ```$ cd path/to/project/```  
1. install dependencies: ```$ npm install```  
1. Open package.json: name your project, add job number.  
1. Open gulp.babel.js: Configure you project by completing the config object. In particular, config.veeva.key_messages.  
1. Generate folder structure: ```$ gulp boilerplate```  
1. inject dependencies into html as needed: ```$ gulp inject```  
1. See it live and get to work: ```$ gulp serve```  
1. When ready for distribution: ```$ gulp build```  

## File Structure Guidelines  
Inside the "src" directory, each folder represents a presentation slide and it's assets. This is where all changes and updates should be made. The "dist" directory is your compiled presentation for production.  

To adhere to Veeva's file structure guidelines, all html presentation slides must be accompanied by a thumb jpeg image (200x150) in the root of each slide folder. Other slide types, like pdf or video, will also need a full jpeg image (1024x768) in the slide root. They must also have the same naming pattern like so:  
src/  
.. client_project_home/  
.. .. client_project_home.html  
.. .. client_project_home-thumb.jpg  
.. .. client_project_home-full.jpg  
.. .. assets/  
.. client_project_dosing/  
.. .. client_project_dosing.html  
.. .. client_project_dosing-thumb.jpg  
.. .. client_project_dosing-full.jpg  
.. .. assets/  

## Configuring your Project
To take advantage of all the workflow features, it would be in your best interest to complete the config properties found in "gulp.babel.js". Here is the breakdown:  

**project**{String} (Required) : Prjocent name. Defaults to package.json name field  
**depExcludes**{Array} (Optional) : Exclude any of your package.json > dependencies by dependency name (affects ```$gulp inject```)  
**depOverrides**{Object} (Optional) : All depencies have a default file but often times other plugins or files are included in the dependency package. To customize the files you wish to use, you can override the default and list an array of filepaths to use instead (affects ```$gulp inject```):  
```
depOverrides: {
    gsap: [ 
         './node_modules/gsap/src/uncompressed/TweenLite.js',
         './node_modules/gsap/src/uncompressed/easing/EasePack.js',
         './node_modules/gsap/src/uncompressed/plugins/CSSPlugin.js',
      ]
   }
```  
**veeva.domain**{String} (Optional) : veeva sandbox ftp domain (affects ```$gulp ftp:veeva```)  
**veeva.username**{String} (Optional) : veeva sandbox ftp username (affects ```$gulp ftp:veeva```)  
**veeva.password**{String} (Optional) : veeva sandbox ftp password (affects ```$gulp ftp:veeva```)  
**veeva.email**{String} (Optional) : email address where error messages will be sent upon ftp upload (affects ```$gulp ftp:veeva```)  
**veeva.product**{String} (Optional) : product id found in Veeva CMS. Looks something like this ```"a00e00b0004DdGv"``` (affects ```$gulp build:ctl```)  
**veeva.disable_actions**{Array} (Optional) : native Veeva disabling options. This will affect every slide in presentation. Possible values: 
["Swipe_vod", "Pinch_To_Exit_vod", "Zoom", "Rotation Lock", "Navigation Bar", "History Buttons"](affects ```$gulp build:ctl```)  
**veeva.key_messages**{Object} (Required) : holds a series of objects containing all slide specific information (affects many gulp tasks)  
```
key_messages {  
    key_message_name: {
        description: '',            //Required: key message description
        disable_actions: [],        //Optional: override disable_actions for particular slide
        has_shared_resource: false, //Optional: don't link shared resource. default is true
        shared_resource_id: '',   //Optional: must be included for the shared key message. 15 digit id found in salesforce
    }
```
**veeva.key_messages.key_message_name**{object key} (Required) : key message name  
**veeva.key_messages.key_message_name.description**{String} (Required) : key message description  
**veeva.key_messages.key_message_name.disable_actions**{Array} (Optional) : override disable_actions for particular slide  
**veeva.key_messages.key_message_name.has_shared_resource**{Boolean} (Optional) : whether to link to shared resource folder. default is true  
**veeva.key_messages.key_message_name.shared_resource_id**{String} (Optional) : 15 digit id found in salesforce. Including this property identifies this parent key message object as the shared key message. It will hold the key_message information for the shared_resource folder (src > shared).   

## Using libs  
In shared > scripts > libs you will find 2 files:
##### veeva-library.js  
is a javascript api provided by Veeva that gives you many methods to get the most out of your presentation. Documentation is provided in the [veeva portal](https://www.veeva.com/alliance-portal/).  
##### veeva-utils.js  
was made to give a list of convenience methods for some of the veeva api's more common but sometimes complex tasks. It also determines if the presentation is currently running in the veeva environment, and if not, it overrides some of the common veeva api methods so that they will work as expected while testing. For instance, the **com.veeva.clm.gotoSlide** method will be overrriden so that it will actually go to the destination slide as intended. Not all methods are being overriden, but they can be added as needed.  

## Using Gulp  
Use gulp tasks. Terminal syntax: ```$ gulp taskName --flag flagValue```  

#### Workflow Tasks: for slide content creation workflow
**$ gulp inject** - Inject package.json dependencies into .hbs and .scss files. This is denoted by the ```<!-- inject:{ext} --><!-- endinject -->``` comments in each file. See [gulp-inject](https://www.npmjs.com/package/gulp-inject) for more details.  
**$ gulp lint** - Lint all javascript files using eslint. Command line will display results. Does not lint dependencies.  
**$ gulp scripts** - Run lint, convert es6 to es5 with sourcemap.   
**$ gulp styles** - Convert scss files to css with sourcemap.  
**$ gulp html** - Convert handlebars files (.hbs) to html.  
**$ gulp index** - Create an index.html that contains links to all slide html.  
**$ gulp serve** - Run html, scripts, styles, index, then serve locally in browser. Browser automatically reloads when files change.    

#### Build Tasks: Compiling to Veeva ready format
**$ gulp clean:dist** - Remove all files in dist folder.  
**$ gulp clean:tmp** - Remove all files in .tmp folder.  
**$ gulp clean** - Remove all files in dist and .tmp folders.  
**$ gulp build:html** - Search html files for ```<!-- build:{ext} savePath --><!-- endbuild -->```and collect js and css files inside the comment tags.  Concatinate, minify, and copy resulting file in the "dist" directory with the comment savePath. In addition, minify html, and copy to "dist". See [gulp-useref](https://www.npmjs.com/package/gulp-useref) for more details.  
**$ gulp build:images** - Compress images and copy to "dist" folder.  
**$ gulp build:extras** - Copy all other files to "dist" folder.  
**$ gulp build:ctl** - Create all .ctl files in dist/ctl. These files hold veeva key message information and are uploaded with zips when using the ftp:veeva task.  
**$ gulp zip:cmd** - zip each slide folder in "dist" directory using methods provided by the command line.  
**$ gulp zip:size** - return a list of all zip file sizes in command line.  
**$ gulp zip** - Run zip:cmd, zip:size.  
**$ gulp build** - Run build:ctl, build:html, build:images, build:extras, zip.  

#### Utility Tasks
**$ gulp boilerplate** - Create a boilerplate with the correct veeva folder structure for all key message slides. To alter the boilerplate files, you can edit any files in ./templates/slide/. Completing the config.veeva object in gulp.babel.js is required.  
**$ gulp ftp:veeva** - Ftp all zip files and .ctl files in "dist" folder to Veeva CMS. Completing the config.veeva object in gulp.babel.js is required.  
**$ gulp ftp:staging** - Ftp all slide folders in "dist" to a host server of your choosing. Completing the config.staging object in gulp.babel.js is required.  
**$ gulp notify** - email recipiants to notify that updates have been made to the project. To alter the email content, edit the ./templates/notify.hbs file. Completing the config.veeva object in gulp.babel.js is required.  

#### Flags: add these flags to hoan a task
**$ --slide key_message_name** or  
**$ -s key_message_name** - include this flag and your 'key message name' after any task to isolate the task's execution to a particular presentation slide. If no --slide flag is given, task will apply to all slides in presentation.  

## Installation
Gulp requires node.js:  
[Install Node.js](https://nodejs.org)  
[Install Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

## API Reference
[Gulp documentation](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

## Contributors
Developers representing DDBHealth 