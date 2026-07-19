if(NOT TARGET react-native-reanimated::reanimated)
add_library(react-native-reanimated::reanimated SHARED IMPORTED)
set_target_properties(react-native-reanimated::reanimated PROPERTIES
    IMPORTED_LOCATION "C:/CODE/csw430/projectMobile_csw430/BabyNutri-MobileProject/MobieReport#/node_modules/react-native-reanimated/android/build/intermediates/cxx/Debug/361y1od3/obj/arm64-v8a/libreanimated.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/CODE/csw430/projectMobile_csw430/BabyNutri-MobileProject/MobieReport#/node_modules/react-native-reanimated/android/build/prefab-headers/reanimated"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

