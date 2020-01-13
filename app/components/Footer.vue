<template>
  <StackLayout>
    <StackLayout verticalAlignment="center" borderRadius="10" backgroundColor="rgba(180,180,180,0.25)" width="70%" height="100">
      <FlexboxLayout padding="10" justifyContent="center" alignItems="space-around" flexDirection="row">
        <FlexboxLayout justifyContent="center" margin="0 10" alignItems="center" padding="20" borderRadius="10" backgroundColor="#3b5999">
          <Label class="fab" :text="'\uf09a'" fontSize="25" color="white"/>
        </FlexboxLayout>
        <FlexboxLayout justifyContent="center" margin="0 10" alignItems="center" padding="20" borderRadius="10" backgroundColor="#1da1f2">
          <Label class="fab" :text="'\uf099'" fontSize="25" color="white"/>
        </FlexboxLayout>
        <FlexboxLayout justifyContent="center" margin="0 10" alignItems="center" padding="20" borderRadius="10" backgroundColor="#db4437">
          <Label class="fab" :text="'\uf1a0'" fontSize="25" color="white"/>
        </FlexboxLayout>
      </FlexboxLayout>
    </StackLayout>
  </StackLayout>
</template>