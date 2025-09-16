import { Button, ButtonText } from "@/components/ui/button";
import DecryptingText from "@/components/ui/decrypting-text";
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import { Heading } from "@/components/ui/heading";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import {
  Animated,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DemoScreen() {
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [selectedTime, setSelectedTime] = React.useState(new Date());
  const [showTimePicker, setShowTimePicker] = React.useState(false);
  const [pressMessage, setPressMessage] = React.useState("");
  const [showGif, setShowGif] = React.useState(false);
  const glowAnimation = React.useRef(new Animated.Value(0)).current;
  const [setShowLongPressText] = React.useState(false);

  const startGlowing = () => {
    Animated.timing(glowAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const stopGlowing = () => {
    Animated.timing(glowAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button
        onPress={() => {
          setShowDrawer(true);
        }}
      >
        <ButtonText>Open Drawer</ButtonText>
      </Button>
      <Drawer
        isOpen={showDrawer}
        size="md"
        anchor="left"
        onClose={() => {
          setShowDrawer(false);
        }}
      >
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerHeader>
            <Heading size="lg">Menu</Heading>
            <DrawerCloseButton>
              <Icon as={CloseIcon} />
            </DrawerCloseButton>
          </DrawerHeader>
          <DrawerBody>
            <DecryptingText text="This is the basic drawer component." />
          </DrawerBody>
          <DrawerFooter>
            <Button
              variant="outline"
              onPress={() => {
                setShowDrawer(false);
              }}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <VStack className="items-center flex-wrap justify-between web:h-full">
        <Heading className="text-4xl text-green-600">
          This is the demo page for multiple gluestack-ui components.
        </Heading>
        <Text className="text-md">
          This is a simple text from gluestack-ui.
        </Text>
      </VStack>
      <Input className="web:w-2/5 variant-outline">
        <InputField
          className="placeholder:text-gray-400"
          placeholder="Enter Text in this Input Component..."
        />
      </Input>

      {Platform.OS === "web" ? (
        <input
          aria-label="Date"
          type="date"
          className="border border-gray-300 rounded-md p-2 bg-[#07aea4]"
        />
      ) : (
        <>
          <Button onPress={() => setShowDatePicker(true)}>
            <ButtonText>Select Date</ButtonText>
          </Button>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowDatePicker(false);
                if (date) setSelectedDate(date);
              }}
            />
          )}
        </>
      )}

      {Platform.OS === "web" ? (
        <input
          aria-label="Time"
          type="time"
          className="border border-gray-300 rounded-md p-2 bg-[#07aea4]"
        />
      ) : (
        <>
          <Button onPress={() => setShowTimePicker(true)}>
            <ButtonText>Select Time</ButtonText>
          </Button>
          {showTimePicker && (
            <DateTimePicker
              value={selectedTime}
              mode="time"
              display="default"
              onChange={(event, time) => {
                setShowTimePicker(false);
                if (time) setSelectedTime(time);
              }}
            />
          )}
        </>
      )}

      <VStack space="md" className="items-center pb-7">
        <Animated.View
          style={[
            styles.glowContainer,
            {
              backgroundColor: glowAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: ["#07aea4", "rgba(255, 0, 204, 1)"],
              }),
              shadowColor: glowAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: ["#07aea4", "rgba(255, 0, 204, 1)"],
              }),
              shadowOpacity: glowAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.8],
              }),
            },
          ]}
        >
          <Pressable
            className="p-5"
            onPressIn={() => {
              startGlowing();
            }}
            onPressOut={() => {
              stopGlowing();
            }}
            onPress={() => {
              setPressMessage("You pressed the button!");
              setShowGif(false);
            }}
            onLongPress={() => {
              setPressMessage("You held the button - that's a long press!");
              setTimeout(() => {
                setShowGif(true);
                setPressMessage("")
              }, 2000);
            }}
            style={{ userSelect: "none" }} // Prevent text selection
          >
            <Text className="text-white font-bold">Press and hold me!</Text>
          </Pressable>
        </Animated.View>

        {pressMessage ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text className="text-lg text-gray-700">{pressMessage}</Text>
            <TouchableOpacity
              style={{
                marginLeft: 8,
                backgroundColor: "#eee",
                borderRadius: 4,
                alignSelf: "flex-start",
                padding: 0,
              }}
              onPress={() => setPressMessage("")}
            >
              <Text className="text-[#07aea4] self-start">x</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {showGif && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={showGif}
            onRequestClose={() => {
              setShowGif(false);
            }}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    zIndex: 1,
                  }}
                  onPress={() => setShowGif(false)}
                >
                  <Text style={{ color: "white", fontSize: 18 }}>✕</Text>
                </TouchableOpacity>
                <Image
                  source={{
                    uri: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXQ1a3lyZW5jZGt3cnI0eHBpZzE0dHd5d3VnbTRndGJpMndmdmJ5diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0G18BkChcRRctMZ2/giphy.gif",
                  }}
                  alt="Button gif"
                  className="w-[400px] h-[300px] justify-center m-left-20"
                  style={{ aspectRatio: 1.5 }}
                />
              </View>
            </View>
          </Modal>
        )}
      </VStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 20,
    width: "100%",
    height: "100%",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  glowContainer: {
    borderRadius: 8,
    boxShadow: "0px 0px 15px rgba(59, 130, 246, 0.3)",
    elevation: 5,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    height: "90%",
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
  },
});
