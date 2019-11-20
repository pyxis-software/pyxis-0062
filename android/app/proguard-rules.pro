# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:
    # Add this global rule
    -keepattributes Signature

    # This rule will properly ProGuard all the model classes in
    # the package com.yourcompany.models. Modify to fit the structure
    # of your app.
    -keepclassmembers class com.pyxis0062.models.** {
      *;
    }