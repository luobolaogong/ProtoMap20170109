
NOTE:  Only images that are referenced from CSS stylesheets should be placed in this folder.  If you need to add an
image to be used by the GWT UI, add the image to: src/com/akimeka/web/resources/client/images and then update (add a
reference) the ImageResources interface.

Exception: Filenames embedded in JavaScript code may be added to this folder, or wherever makes sense.  


Update: com.akimeka.web.resources.client.images.ImageResources.java

    ...

    @Source("export/clipboard_icon_16x16.gif")
    ImageResource clipboardIcon();

    ...


To use the ImageResources bundle:

    ...

    TextButton clipBoardButton = new TextButton();
    clipBoardButton.setIcon(Resources.IMAGES.clipboardIcon());

    ...


