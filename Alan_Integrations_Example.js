//
// Web Integration Examples
// - React: https://github.com/alan-ai/alan-sdk-web/tree/master/examples/alan-example-integration-react
// - Angular: https://github.com/alan-ai/alan-sdk-web/tree/master/examples/alan-example-integration-angular
// - Vue: https://github.com/alan-ai/alan-sdk-web/tree/master/examples/alan-example-integration-vue
// - Ember: https://github.com/alan-ai/alan-sdk-web/tree/master/examples/alan-example-integration-ember
// - Electron: https://github.com/alan-ai/alan-sdk-web/tree/master/examples/alan-example-integration-electron

// If you want to try one of these examples connected to this project, open the Embed Code popup located in the top menu in the Alan Studio.
// Here you will find an Alan SDK Key. Simply copy it and replace this key '314203787ccd9370974f1bf6b6929c1b2e956eca572e1d8b807a3e2338fdd0dc/prod' in your project.

// If you want to integrate Alan with your existing app, you can find platform-specific guidance in the Embed Code popup.
// Platform-specific topics on how to integrate Alan with your application are also covered in our documentation.
//
// iOS Integration
// - Swift: https://alan.app/docs/client-api/ios/ios-api#integrate-into-swift
// - ObjectiveC: https://alan.app/docs/client-api/ios/ios-api#integrate-into-objective-c
//
// Android Integration
// - Java: https://alan.app/docs/client-api/android/android-api
// - Kotlin: https://alan.app/docs/client-api/android/android-api
//
// Web Integration
// - React: https://alan.app/docs/client-api/web/react
// - Angular: https://alan.app/docs/client-api/web/angular
// - Vue: https://alan.app/docs/client-api/web/vue
// - Ember: https://alan.app/docs/client-api/web/ember
// - JavaScript: https://alan.app/docs/client-api/web/vanilla
// - Electron: https://alan.app/docs/client-api/web/electron
// - Web Component: https://alan.app/docs/client-api/web/web-component

question('what is this', p =>  {
    p.play('This is Visionary powered by Alan AI, an extremely advanced voice assistant that can help you order grocery products online.');
});

question('What (all can you do for me|can you do?)', p => {
    p.play('I can order grocery products for you and get them delivered to your doorstep.');
});
question('How should I (begin|start)', p => {
    p.play('You can ask me to select a category and then I will navigate to the required page.For example you can say go to dairy.');
});

intent('(What are| Name|List) (the|)(all| all the|) categories', p => {
    p.play(`The categories are Fruits & Vegetables, Dairy, Daily Essentials, Beverages, Personal Care, Cleaning and Household`);
});

const catSlot = "$(CAT Fruits & Vegetables|Dairy|Daily Essentials|Beverages|Personal Care|Cleaning and Household)"
intent(`(I want to go | go | navigate) (to|) ${catSlot}`, p => {
    p.play({command:"choseCat" , payload:{name:p.CAT.value}} );
});

intent(`(I want to go | go | navigate|) (to|) (back|previous)`, p => {
    p.play({command:"back"} );
});
intent(`(I want to go | go | navigate|) (to|) checkout`, p => {
    p.play({command:"checkout"} );
});

intent(`(Add|Insert) $(PROD)`,p=>{
     p.play({command:"addItem" , payload:{name:p.PROD.value}} );
})

intent(`(I want to go | go | navigate|) (to|) (home|first page|home page)`, p => {
    p.play({command:"home"} );
});
