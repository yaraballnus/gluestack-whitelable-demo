import { Button, ButtonText } from "@/components/ui/button";
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
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DemoScreen() {
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);

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
            <Text>This is the basic drawer component.</Text>
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
        <Text className="text-md">This is a simple text from gluestack-ui.</Text>
      </VStack>
      <Input variant="outline" size="md">
        <InputField placeholder="Enter Text in this Input Component..." />
      </Input>

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
});
