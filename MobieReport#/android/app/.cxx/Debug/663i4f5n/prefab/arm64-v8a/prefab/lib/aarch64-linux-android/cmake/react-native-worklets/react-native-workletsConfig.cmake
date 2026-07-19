if(NOT TARGET react-native-worklets::worklets)
add_library(react-native-worklets::worklets SHARED IMPORTED)
set_target_properties(react-native-worklets::worklets PROPERTIES
    IMPORTED_LOCATION "C:/CODE/csw430/projectMobile_csw430/BabyNutri-MobileProject/MobieReport#/node_modules/react-native-worklets/android/build/intermediates/cxx/Debug/1d622l1x/obj/arm64-v8a/libworklets.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/CODE/csw430/projectMobile_csw430/BabyNutri-MobileProject/MobieReport#/node_modules/react-native-worklets/android/build/prefab-headers/worklets"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

