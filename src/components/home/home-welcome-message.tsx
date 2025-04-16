import { APP_CONFIG } from "@/config"
import { Center, Heading } from "@chakra-ui/react"

export const HomeWelcomeMessage = () => {
  return (
    <Center
      data-state="open"
      _open={{
        animationName: "fade-in, scale-in",
        animationDuration: "2s",
      }}
      flex={1}
      display="flex"
      flexDirection={'column'}
      alignItems={'center'}
    >
      <Heading>{APP_CONFIG.homeMessage}</Heading>
    </Center>
  )
}
