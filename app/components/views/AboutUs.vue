<template>
  <ViewContainer>
    <FlexboxLayout padding="0 20" height="100%">
      <FlexboxLayout flexDirection="column" width="100%" alignItems="center" height="80%">
        <Label text="Who are we?" fontSize="40" marginTop="40" color="#8c8c8c"/>
        <StackLayout height="30"></StackLayout>

        <Image src="~/images/logce-dark.png" height="60"/>
        <StackLayout height="40"></StackLayout>

        <Label fontSize="24" textWrap="true" text="IS THE NEW MEDIATOURISTIC PLATFORM BASED AROUND THE METRO. WE PRESENT YOU, VIA VIDEOS, THE BEST LOCATIONS AND SERVICES FOR TOURISTS AND CITIZENS OF MONTREAL." color="#8c8c8c"/>
        <StackLayout height="40"></StackLayout>

        <StackLayout width="100%">
          <Label fontSize="21" textWrap="true" text="- Trouve ta Station et Clik-un-clip!"/>
          <Label fontSize="21" textWrap="true" text="- Find your Station and Clik-a-clip!"/>
          <Label fontSize="21" textWrap="true" text="- Login to our platform to unlock discounts and gifts"/>
        </StackLayout>
      </FlexboxLayout>
    </FlexboxLayout>
  </ViewContainer>
</template>

<script>
export default {
}
</script>